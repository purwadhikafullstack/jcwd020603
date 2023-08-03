const express = require("express");
const router = express.Router();
const orderController = require("../controllers").orderController;
const roleController = require("../middleware/checkRole");

router.get("/", roleController.checkUser, orderController.getAll);
router.get("/latest", roleController.checkUser, orderController.getByOrderId);
router.post("/", roleController.checkUser, orderController.postOrder);

module.exports = router;
