const express = require("express");
const router = express.Router();
const orderController = require("../controllers").orderController;
const roleController = require("../middleware/checkRole");

router.get("/", roleController.checkUser, orderController.getAll);

module.exports = router;
