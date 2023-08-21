const express = require("express");
const router = express.Router();
const voucherController = require("../controllers").voucherController;
const roleController = require("../middleware/checkRole");

router.get("/", voucherController.getAllVoucher);
router.patch("/:id", roleController.checkUser, voucherController.updateLimit);
router.get("/all", voucherController.getAll);
router.post("/", roleController.checkAdmin, voucherController.addVoucher);
router.patch("/", roleController.checkAdmin, voucherController.updateVoucher);
router.delete("/", roleController.checkAdmin, voucherController.deleteVoucher);

module.exports = router;
