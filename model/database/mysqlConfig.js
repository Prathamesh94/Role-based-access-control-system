const Sequelize = require('sequelize');

const  mysqlDB= new Sequelize({
    database:process.env.DB_NAME,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    dialect:process.env.DB_TYPE
})

module.exports = {
    mysqlDB
}