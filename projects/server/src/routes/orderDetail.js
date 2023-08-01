const express = require("express");
const router = express.Router();
const orderDetailController = require("../controllers").orderDetailController;
const roleController = require("../middleware/checkRole");

router.get("/", roleController.checkUser, orderDetailController.getAll);

module.exports = router;
