var itemController = require("../controller/itemController");
var middleware = require("../middleware/tokenMiddleware");
var express = require("express");
var router = express.Router()

router.get('/',itemController.getAllItems);
router.post('/filterCategories',itemController.getItemByCategory);
router.post("/addItem",middleware.verifyAdmin,itemController.addItem);
router.delete('/delete/:id', middleware.verifyAdmin ,itemController.deleteItem);
router.put('/:id', middleware.verifyAdmin, itemController.updateItem)
router.get('/purchase',middleware.verifyToken,function(req,res){ res.json({
    msg: "succesfully purchased item"
  })
}) ;

module.exports = router