const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Person = require('./models/Person')

passport.use(new LocalStrategy(async (username, password, done) => {
    //aunthication logic
    try {
        // console.log("Recevied credentials...", username, password)
        const user = await Person.findOne({ username: username })
        if (!user) {
            return done(null, false, { message: "Incorret username" })
        }
        const isMatchPassword =await user.comparePassword(password)
        if (isMatchPassword) {
            return done(null, user)
        }
        else {
            return done(null, false, { message: 'incoorect Password' })
        }
    } catch (err) {
        return done(err)
    }
}))

module.exports=passport