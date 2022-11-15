const express = require('express')
const session = require('express-session')
const colors = require('colors')
require('dotenv').config('./.env')

require('./config/db')

const app = express()

const {
    PORT = 3000,
    SSN_LIFETIME = 1000 * 60 * 60 * 2,
    SSN_NAME = 'ssn_id',
    SSN_SECRET = 'default_secret',
    NODE_ENV = 'dev',
} = process.env

// TODO: DB
const users = [
    { id: 1, name: 'Alex', email: 'alex@gmail.com', password: 'secret' },
    { id: 2, name: 'Max', email: 'max@gmail.com', password: 'secret' },
    { id: 3, name: 'Hagard', email: 'hagard@gmail.com', password: 'secret' }
]

// Mounting middlewares
app.use(express.urlencoded({ extended: true }))

app.use(session({
    name: SSN_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SSN_SECRET,
    cookie: {
        maxAge: process.env.SSN_LIFETIME || TWO_HOURS,
        sameSite: true,
        secure: (NODE_ENV === 'prod') ? true : false,
        httpOnly: true
    }
}))

// app.use((req, res, next) => {
//     const { userId } = req.session
//     if (userId) {
//         res.locals.user = users.find(user => user.id === userId)
//     }
//     next()
// })

app.use('/', require('./routes/auth.route'))
app.use('/', require('./routes/user.route'))

app.listen(3000 || process.env.PORT, console.log('Server running on port 3000!'))
