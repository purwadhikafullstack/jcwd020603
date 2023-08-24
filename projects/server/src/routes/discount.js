const express = require("express");
const router = express.Router();
const discountController = require("../controllers").discountController;
const roleController = require("../middleware/checkRole");

router.get("/all", discountController.getAll);
router.get("/", discountController.getDiscountB);
router.post("/", roleController.checkAdmin, discountController.addDiscount);
router.patch("/", roleController.checkAdmin, discountController.updateDiscount);
router.delete(
  "/",
  roleController.checkAdmin,
  discountController.deleteDiscount
);

module.exports = router;
