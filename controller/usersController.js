const {Users } = require('../model/index');
const {generateHash} = require("../utils/hash");
const {createJwt} = require("../utils/jwt");
console.log(Users)
async function createUser(userOpts){

    if(!userOpts.email){
        throw  new Error('Email ID is missing')
    }
    if(!userOpts.roleName){
        throw  new Error('RoleName is missing')
    }
    if(!userOpts.username){
        throw  new Error('username is missing')
    }
    if(!userOpts.password){
        let passwordMissingError = new Error('Password is missing')
        passwordMissingError.name = "Invalid_Request"
        passwordMissingError.statusCode = 403
        throw  passwordMissingError
    }
    try {
        const user = await Users.create({
            ...userOpts, // TODO: Password not in plaintext
        });
        //user.addRole(role)
    }catch (err){
        console.log(err)
        throw err
    }

    return userOpts


}

async  function verifyUser(userOpts){
    if (!userOpts.email) {
        throw new Error('Did not supply email')
    }
    if (!userOpts.password) {
        throw new Error('Did not supply password')
    }

    const user = await Users.findOne({
        attributes: ['email', 'username','password','roleName'],
        where: {
            email: userOpts.email,
        }
    })

    if (!user) {
        throw new Error('No user with given email address')
    }

    if (user.password !== generateHash(userOpts.password)) {
        throw new Error('Password does not match')
    }
    const token = await createJwt(user.get())
    const userJson = {
        ...user.get(),
        token
    }
    delete userJson.password
    return userJson

}

async function deleteUser(email){
    if (!email) {
        throw new Error('Did not supply email')
    }
    const user = await Users.findOne({
        attributes: ['email', 'username','password'],
        where: {
            email: email,
            roleName: "NON-ADMIN"
        }
    })
    user.destroy()
    return {email:email}

}
async function getUserlist(){

    const user = await Users.findAll({
        attributes:['email','username']

    })
    return {...user}
}
module.exports = {
    createUser,verifyUser,getUserlist,deleteUser
}