// Adapted from "Web Information Technologies Tutorial 9"
// Accessed 27.09.2022
// INFO30005 Tutorial 9 - Passport.js

const passport = require('passport')
const express = require('express')
const router = express.Router()

// For Login page
router.get('/login', (req, res) => {
    res.render('login', { flash: req.flash('error'), title: 'Login' })
})

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/user', failureRedirect: '/login', failureFlash: true
    })
)

module.exports = router