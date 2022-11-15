const express = require('express')
const { Op } = require('sequelize')
const { uuid } = require('uuidv4');
const router = express.Router()

const { redirectLogin, redirectDashboard } = require('../middlewares/middleware')

const User = require('../models/User')

router.post('/register', async (req, res) => {
    const { uname, email, password } = req.body

    if (uname && email && password) { // TODO: Validation
        const exists = await User.findOne({
            where: {
                [Op.or]: {
                    uname: uname,
                    email: email
                }
            }
        })

        if (!exists) {
            const newUser = await User.create({
                uid: uuid(),
                uname, email, password
            })

            req.session.userId = newUser.uid

            return res.redirect('/dashboard')
        }
    }

    res.redirect('/register?error=user_already_exists') // Display errors using qs params (register?error=<>)
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    if (email && password) {
        const user = await User.findOne({
            where: {
                [Op.and]: {
                    email: email,
                    password: password
                }
            }
        })

        if (user) {
            req.session.userId = user.uid
            return res.redirect('/dashboard')
        }
    }

    res.redirect('/login')
})

router.post('/logout', redirectLogin, (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/dashboard')
        }

        res.clearCookie(process.env.SSN_NAME || 'SESSIONID')
        res.redirect('/login')
    })
})

module.exports = router