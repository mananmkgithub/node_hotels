const express = require('express')
const app = express();
const mongoose = require('mongoose');
const MONGO_URL = "mongodb+srv://Root:Mk2004@mk.unqjvc3.mongodb.net/hotels?retryWrites=true&w=majority&appName=Mk";
const passport = require('./auth')

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body
const PORT = 3000;

// Middleware Function

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
    next(); // Move on to the next phase
}

app.use(logRequest);
app.use(passport.initialize())
const localAuthMiddleware = passport.authenticate('local', { session: false })
app.get('/', function (req, res) {
    res.send('Welcome to our Hotel');
})

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person',localAuthMiddleware,personRoutes);
app.use('/menu',menuItemRoutes);

mongoose.connect(MONGO_URL).then(() => {
    console.log("Mongo db Connectd...")
    app.listen(PORT, () => {
        console.log('listening on port 3000');
    })
}).catch((er) => {
    console.log("Mongodb is not Connected..", er)
})

