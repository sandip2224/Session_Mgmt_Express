const express = require('express')
const { where } = require('sequelize')
const router = express.Router()

const { redirectLogin, redirectDashboard } = require('../middlewares/middleware')

const User = require('../models/User')

router.post('/register', (req, res) => {
    const { name, email, password } = req.body

    if (name && email && password) { // TODO: Validation
        const exists = User.findOne({ where: {uname: name} }) users.some(user => user.name === name || user.email === email)

        if (!exists) {
            const newUser = {
                id: users.length + 1,
                name,
                email,
                password // TODO: Hashing
            }

            users.push(newUser)
            req.session.userId = newUser.id
            return res.redirect('/dashboard')
        }
    }

    res.redirect('/register') // Display errors using qs params (register?error=<>)
})

router.post('/login', (req, res) => {
    const { email, password } = req.body

    if (email && password) {
        const user = users.find(user => user.email === email && user.password === password)

        if (user) {
            req.session.userId = user.id
            return res.redirect('/dashboard')
        }
    }

    res.redirect('/login')
})

router.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/home')
        }

        res.clearCookie(SSN_NAME)
        res.redirect('/login')
    })
})

module.exports = router