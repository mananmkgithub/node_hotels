const express = require('express');
const router = express.Router();
const Person = require('../models/Person');
const { jwtauthmiddleware, generatetoken } = require('../jwt')
const mongoose = require('mongoose');

router.get('/', jwtauthmiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
router.get('/p', jwtauthmiddleware, async (req, res, next) => {
    try {
        const userData = req.user
        let obj=Object(userData)
        let name=obj.userData.username
        const user = await Person.findOne({username:name})
        res.status(200).json({ user })
    } catch (er) {
        console.log(er)
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType; // // Extract the work type from the URL parameter
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('response fetched');
            res.status(200).json(response);
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post('/signup', async (req, res) => {
    try {
        const data = req.body
        const newMenu = new Person(data);
        const response = await newMenu.save();
        console.log('data saved');
        const payload = {
            id: response._id,
            username: response.username,
        }
        console.log(JSON.stringify(payload))
        const token = generatetoken(payload)
        console.log("token is:", token)
        res.status(200).json({ response: response, token: token });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})
//login route
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await Person.findOne({ username: username })
        if (!user || !await user.comparePassword(password)) {
            return res.status(401).json({ error: 'invaild username or password' })
        }
        // generate token
        const payload = {
            id: user.id,
            username: user.username,
        }
        const token = generatetoken(payload)
        res.json({ token })
    } catch (er) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})



router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }

        console.log('data updated');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the person's ID from the URL parameter

        // Assuming you have a Person model
        const response = await Person.findByIdAndRemove(personId);
        if (!response) {
            return res.status(404).json({ error: 'Person not found' });
        }
        console.log('data delete');
        res.status(200).json({ message: 'person Deleted Successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

// profile route

// comment added for testing purposes
module.exports = router;