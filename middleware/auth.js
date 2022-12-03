const { verifyJwt } = require('../utils/jwt')
let {Access} = require("../model/roleAccess")
const {Users} = require("../model");
let operationAccess = {
    "POST":"WRITE",
    "DELETE":"WRITE",
    "GET":"READ",
    "PUT":"WRITE"
}
async function userAuthorization(req, res, next) {
    const auth = req.header('Authorization')
    if (!auth) {
        next(new Error('Only for logged in users'))
        return
    }

    if (!auth.startsWith('Token')) {
        next(new Error('Authorization format not supported'))
        return
    }
    //TOKEN format : bearer token
    const token = auth.substr(6)
    try {
        const user = await verifyJwt(token)
        req.user = user
        await checkAccess(req.method,user.roleName)
    } catch (err) {
        next(new Error('JWT verification failed'))
    }

}
async function  checkAccess(method,roleName){
    return new Promise(async (resolve,reject)=>{
        const access = await Access.findOne({
            attributes: ['accessName'],
            where: {
                roleName: roleName,
                accessName:operationAccess.method
            }
        })
        if(!access) reject('Operation not permitted for this role')
        resolve(true)
    })


}

module.exports = {
    userAuthorization
}