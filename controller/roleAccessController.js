const {Role,Access,rolesList,accessList,roleAccessMapping} = require("../model/roleAccess")

async function createRoles(){
    try{
        for (const role of rolesList) {
            let roleCreated = await Role.create({"roleName":role})
            for (const access of roleAccessMapping[role]) {
                await roleCreated.addAccess(access)
            }

        }
    }catch (err){
        console.log(err)
    }


}
async function accessRoles(){

    accessList.forEach((access)=>{
        Access.create({
            "accessName":access
        })
    })
}
(async function (){
    await accessRoles()
    await createRoles()
})()


/*
* rolesList.forEach((role)=>{
        Role.create({"roleName":role},{ include:[roleAccessMapping[role]]})
        })
*
* */
/*
* rolesList.forEach((role)=>{
        Role.create({
            "roleName":role
        }).then(function(role){
            let properties = roleAccessMapping[role].map((access) =>{
                return {"accessName":access}
            })
            role.setProperties(properties)
        })
    })
*
*
* */