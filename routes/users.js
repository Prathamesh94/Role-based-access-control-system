var express = require('express');
const {createUser,verifyUser,getUserlist,deleteUser} = require("../controller/usersController");
const {userAuthorization} = require("../middleware/auth");
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  try{
    let userList = getUserlist()
    res.send(userList);
  }catch (err){
    next(err)
  }
});
//TODO provide access to resource based on role
//Only admin can access delete method and we can delete only non-admin account
router.delete('/:id', function(req, res, next) {
  try{
    let deletedUser = deleteUser(req.params.id)
    res.send(deletedUser);
  }catch (err){
    next(err)
  }
});
//TODO provide access to resource based on role
//Only admin can access post method
router.post('/',userAuthorization, async function (req, res, next) {
  try{
    const user = await createUser(req.body.user,req.body.role)
    res.send(user);
  }catch (err){
    next(err)
  }

});
router.post('/login', async (req, res,next) => {
  try {
    const verifiedUser = await verifyUser(req.body.user)
    res.send(verifiedUser)
  } catch (err) {
    next(err)
  }
})

module.exports = router;
