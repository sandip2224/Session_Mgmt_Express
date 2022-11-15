const express = require('express')
const colors = require('colors')
require('dotenv').config('./.env')
const session = require('express-session')
const redis = require('redis')
const RedisStore = require('connect-redis')(session)

// Connect to MySQL Instance
require('./config/db')

const redisClient = redis.createClient({ host: 'localhost', port: 6379, legacyMode: true })

// Connect to Redis local instance
redisClient.connect().catch(console.error)

const User = require('./models/User')
const app = express()

const {
    PORT = 3000,
    SSN_LIFETIME = 1000 * 60 * 60 * 2,
    SSN_NAME = 'SESSIONID',
    SSN_SECRET = 'default_secret',
    NODE_ENV = 'dev',
} = process.env


// # Mounting middlewares

app.use(express.urlencoded({ extended: true }))

app.use(session({
    name: SSN_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SSN_SECRET,
    cookie: {
        maxAge: SSN_LIFETIME,
        sameSite: true,
        secure: (NODE_ENV === 'prod') ? true : false,
        httpOnly: true
    },
    store: new RedisStore({ client: redisClient })
}))

app.use(async (req, res, next) => {
    const { userId } = req.session
    if (userId) {
        const user = await User.findOne({ where: { uid: userId } })
        res.locals.user = user
    }
    next()
})

app.use('/', require('./routes/auth.route'))
app.use('/', require('./routes/user.route'))

app.listen(PORT, console.log('Server running on port 3000!'))
