const express = require('express')
const router = express.Router()

const { redirectLogin, redirectDashboard } = require('../middlewares/middleware')

const User = require('../models/User')

// Routes for handling frontend views

router.get('/', (req, res) => {
    const { userId } = req.session
    const { user } = res.locals
    res.send(`
        <h1>Welcome!</h1>
        ${userId
            ?
            `<a href='/dashboard'>Go to dashboard ${user.uname}</a>
            <form method='post' action='/logout'>
                <button>Logout</button>
            </form>`
            :
            `<a href='/login'>Login</a>
            <a href='/register'>Register</a>`
        }
    `)
})

router.get('/dashboard', redirectLogin, async (req, res) => {
    const { user } = res.locals

    res.send(`
        <h1>User Dashboard!</h1>
        <a href='/'>Home</a>
        <ul>
            <li>Username: ${user.uname}</li>
            <li>Email: ${user.email}</li>
        </ul>
        <form method='post' action='/logout'>
            <button>Logout</button>
        </form>
    `)
})

router.get('/login', redirectDashboard, (req, res) => {
    res.send(`
        <h1>Login Page!</h1>
        <form method='post' action='/login'>
            <input type='email' name='email' placeholder='Enter email' required/>
            <input type='password' name='password' placeholder='Enter password' required/>
            <input type='submit'/>
        </form>
        <a href='/register'>Register</a>
    `)
})

router.get('/register', redirectDashboard, (req, res) => {
    res.send(`
        <h1>Register Page!</h1>
        <form method='post' action='/register'>
            <input type='text' name='uname' placeholder='Enter username' required/>
            <input type='email' name='email' placeholder='Enter email' required/>
            <input type='password' name='password' placeholder='Enter password' required/>
            <input type='submit'/>
        </form>
        <a href='/login'>Login</a>
    `)
})

module.exports = router
