// Adapted from "Web Information Technologies Tutorial 9"
// Accessed 27.09.2022
// INFO30005 Tutorial 9 - Passport.js

// Authentication strategy.

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/user')

passport.serializeUser((user, done) => {
    done(undefined, user._id)
})

passport.deserializeUser((userId, done) => {
    User.findById(userId, { password: 0 }, (err, user) => {
        if (err) {
            return done(err, undefined)
        }
        return done(undefined, user)
    })
})

passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username }, {}, {}, (err, user) => {
            if (err) {
                return done(undefined, false, {
                    message: 'Unknown error has occurred'
                })
            }
            if (!user) {
                return done(undefined, false, {
                    message: 'Incorrect email or password',
                })
            }
            
            user.verifyPassword(password, (err, valid) => {
                if (err) {
                    return done(undefined, false, {
                        message: 'Unknown error has occurred'
                    })
                }
                if (!valid) {
                    return done(undefined, false, {
                        message: 'Incorrect email or password',
                    })
                }

                return done(undefined, user)
            })
        })
    })
)

module.exports = passport