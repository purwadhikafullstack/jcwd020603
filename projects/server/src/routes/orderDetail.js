const express = require("express");
const router = express.Router();
const orderDetailController = require("../controllers").orderDetailController;
const roleController = require("../middleware/checkRole");

router.get("/", orderDetailController.getAll);

module.exports = router;
