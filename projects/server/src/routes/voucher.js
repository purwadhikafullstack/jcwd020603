const express = require("express");
const router = express.Router();
const voucherController = require("../controllers").voucherController;
const roleController = require("../middleware/checkRole");

router.get("/", voucherController.getAllVoucher);
router.patch("/:id", roleController.checkUser, voucherController.updateLimit);
router.get("/", voucherController.getAll);
router.post("/", voucherController.addVoucher);
router.patch("/", voucherController.updateVoucher);
router.delete("/", voucherController.deleteVoucher);

module.exports = router;
