var express = require('express');
const {createUser,verifyUser,getUserlist,deleteUser} = require("../controller/usersController");
const {userAuthorization} = require("../middleware/auth");
var router = express.Router();

/* GET users listing. */
router.get('/',userAuthorization, async function(req, res, next) {
  try{
    let userList = await getUserlist()
    res.send(userList);
  }catch (err){
    next(err)
  }
});

//Only admin can access delete method and we can delete only non-admin account
router.delete('/:id',userAuthorization, async function(req, res, next) {
  try{
      let deletedUser = await deleteUser(req.params.id)
    let userList = await getUserlist()
    res.render('userList', {title: 'user list',users:userList});
  }catch (err){
    next(err)
  }
});

//Only admin can access post method
router.post('/',userAuthorization, async function (req, res, next) {
  try{
    const user = await createUser(req.body,req.body.role)
    let userList = await getUserlist()
    res.render('userList', {title: 'user list',users:userList});
  }catch (err){
    next(err)
  }

});
router.post('/login', async (req, res,next) => {
  try {
    const verifiedUser = await verifyUser(req.body)
    let userList = await getUserlist()
    res.cookie('token', "Token "+verifiedUser.token, { httpOnly: true });
    res.render('userList', {title: 'user list',users:userList,verifiedUser:verifiedUser});
    //res.send(verifiedUser)
  } catch (err) {
    next(err)
  }
})

module.exports = router;
