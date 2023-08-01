const express = require("express");
const router = express.Router();
const cartController = require("../controllers").cartController;
const roleController = require("../middleware/checkRole");

router.get("/", roleController.checkUser, cartController.getAllCart);
router.patch("/", roleController.checkUser, cartController.updateQty);
router.delete("/", roleController.checkUser, cartController.deleteCart);
router.post("/cost", roleController.checkUser, cartController.getCost);
router.post(
  "/:id",
  roleController.checkUser,
  cartController.cartChecker,
  cartController.addQty
);

module.exports = router;
