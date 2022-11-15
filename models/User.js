const Sequelize = require('sequelize')
const db = require('../config/db')

const User = db.define('user', {
    uid: {
        type: Sequelize.UUIDV4,
        primaryKey: true
    },
    uname: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

User.sync()
    .then(console.log('> [SUCCESS] User Table has been created!!'.green.underline))
    .catch(err => console.log('> [ERROR] User Table creation failed!!'.red.underline))

module.exports = User