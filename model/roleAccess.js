const Sequelize = require('sequelize');
const {db} = require("../model/database/config")

let rolesList = ["ADMIN","NON-ADMIN"]
let accessList = ["READ","WRITE"]
let roleAccessMapping = {
    "ADMIN":accessList,
    "NON-ADMIN":["READ"]
}

const Role = db.define('roles', {
    roleName: {
        type: Sequelize.ENUM,
        values: rolesList,
        allowNull: false,
        primaryKey:true
    }
});
const Access = db.define('access', {
    accessName: {
        type: Sequelize.ENUM,
        values: accessList,
        allowNull: false,
        primaryKey:true
    }
});

module.exports = {
    Role,Access,rolesList,accessList,roleAccessMapping
}