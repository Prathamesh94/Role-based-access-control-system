const Sequelize = require('sequelize');
const {db} = require("../model/database/config")
const {generateHash} = require("../utils/hash");
const role = require("./roleAccess")

const Users = db.define('users', {
    email: {
        type: Sequelize.STRING,
        primaryKey: true,
        validate: {
            isEmail: true
        },
        unique: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING
    },
    mobileNumber: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        set(value) {
            // Storing passwords in plaintext in the database is terrible.
            // Hashing the value with an appropriate cryptographic hash function is better.
            this.setDataValue('password', generateHash(value));
        }
    },
    //TODO use config from roleAccess
    roleName: {
        type: Sequelize.ENUM,
        values:["ADMIN","NON-ADMIN"],
        allowNull: false,
        references: {
            model: 'roles',
            key: 'roleName',
        }
    }
});

module.exports = {
    Users
}
