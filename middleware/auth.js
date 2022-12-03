const { verifyJwt } = require('../utils/jwt')
const {Users} = require("../model");
const {Access,roleAccess} = require("../model/roleAccess");
let operationAccess = {
    "POST":"WRITE",
    "DELETE":"WRITE",
    "GET":"READ",
    "PUT":"WRITE"
}
async function userAuthorization(req, res, next) {
    const auth = (req.cookies.token) ? req.cookies.token :req.header('Authorization')

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
        next()
    } catch (err) {
        next(err)
    }

}
async function  checkAccess(method,roleName){
    return new Promise(async (resolve,reject)=>{
        try{
            //TODO query DB to check access of user
           /* const access = await roleAccess.findOne({
                attributes: ['accessName'],
                where: {
                    roleName: roleName,
                    accessName:operationAccess[method]
                }
            })*/

            if(roleName != "ADMIN" && operationAccess[method] == "WRITE") reject('Operation not permitted for this role')
            resolve(true)
        }catch (err){
            console.log(err)
            reject(err)
        }

    })


}

module.exports = {
    userAuthorization
}