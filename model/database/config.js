const {mysqlDB} = require("./mysqlConfig")
function getDatabaseInstance(dbType){
    if(dbType == "MYSQL") {
        console.log(dbType)
        return mysqlDB
    }
}
const databaseTypesEnum = {
    "MYSQL":"MYSQL"
}
let db = getDatabaseInstance(databaseTypesEnum.MYSQL)
module.exports = {
    db
}