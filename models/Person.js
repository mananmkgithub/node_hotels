const mongoose = require('mongoose');
// const bcrypt=require('bcrypt')
// Define the Person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef', 'waiter', 'manager'],
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});

// personSchema.pre('save',async function(next){
//     const person=this
//     if(!person.isModified('password')) return next()
//     try{
//         // hash password
//         const salt=await bcrypt.genSalt(10)
//         const hashpassword=await bcrypt.hash(person.password,salt)
//         person.password=hashpassword
//         next()
//     }catch(er){
//         return next(er)
//     }
// })

// personSchema.methods.comparePassword=async function name(candidatepassword) {
//     try{
//         const ismatch=await bcrypt.compare(candidatepassword,this.password)
//         return ismatch
//     }
//     catch(er){
//         throw er
//     }
// }

// Create Person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;