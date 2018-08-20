var express = require('express');
var router = express.Router();
var itemController = require("../controller/itemController");
var userController = require('../controller/userController');
var tokenMiddleware = require("../middleware/tokenMiddleware");
/* GET users listing. */
router.post('/', userController.addNormalUser);
router.post('/createAdmin',tokenMiddleware.verifyAdmin,userController.addAdminUser);
router.post('/signin',userController.signIn);
router.get('/isAdmin', tokenMiddleware.isAdmin);

module.exports = router;
