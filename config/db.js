const Sequelize = require('sequelize')

const sequelize = new Sequelize('userDB_dev', process.env.SQL_USER, process.env.SQL_PASS, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

sequelize.authenticate()
    .then(() => console.log(`> [SUCCESS] Database connected...`.green.underline))
    .catch(err => {
        console.log(`> [ERROR] Database connection failed!!`.red.underline)
        console.log(err)
    })

module.exports = sequelize