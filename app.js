// Runs the app 
const express = require('express') 
const homerouter = require('./routes/homerouter')
const flash = require('express-flash')
const session = require('express-session')

// Set your app up as an express app 
const app = express() 
const handlebars = require('express-handlebars')
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.engine(
    'hbs',
    handlebars.engine({
        defaultlayout: 'main',
        extname: 'hbs'
    })
)
app.set('view engine', 'hbs')

// Adapted from "Web Information Technologies Tutorial 9"
// Accessed 27.09.2022
// INFO30005 Tutorial 9 - Passport.js
// Track authenticated users through login sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET || 'keyboard cat',
        name: 'cookie',
        saveUninitialized: false,
        resave: false,
        cookie: {
            sameSite: 'strict',
            httpOnly: true,
            secure: app.get('env') === 'production'
        },
    })
)

if (app.get('env') === 'production') {
    app.set('trust proxy', 1);
}

// Display flash warnings in case of incorrect input.
app.use(flash())
app.use('/', homerouter);

// Initialise passport.js
const passport = require('./passport')
app.use(passport.authenticate('session'))

// Load authentication router
const authRouter = require('./routes/auth')
app.use(authRouter)

// Set up authentication method.
const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/login')
    }
    return next()
}

const user_router = require('./routes/userRouter.js')
app.use('/user', isAuthenticated, user_router)

// Set up error page for wrong URL.
app.get('*', (req, res) => {
    res.render('404')
})

// Tells the app to listen on port number provided by Heroku or 3000 and logs that information to the console. 
app.listen(process.env.PORT || 3000, () => { 
    console.log('app is running') 
});

require('./models')