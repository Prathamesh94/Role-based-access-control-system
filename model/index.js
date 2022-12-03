
const {Users} = require("./user")
const {Role,Access} = require("./roleAccess")



Role.belongsToMany(Access, { through: 'roleAccess' })
Access.belongsToMany(Role, { through: 'roleAccess' })
Users.hasOne(Role)
Role.belongsTo(Users)
module.exports={
    Users,Role,Access
}
