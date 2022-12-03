const roleAccess = require("../controller/roleAccessController")
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send('Resource not found' );
});

module.exports = router;
