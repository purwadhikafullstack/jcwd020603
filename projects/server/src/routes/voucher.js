const express = require("express");
const router = express.Router();
const voucherController = require("../controllers").voucherController;
const roleController = require("../middleware/checkRole");

router.get("/", voucherController.getAll);
router.patch("/:id", roleController.checkUser, voucherController.updateLimit);

module.exports = router;
