const express = require("express");
const router = express.Router();
const addressControllerG = require("../controllers").addressControllerG;
const roleController = require("../middleware/checkRole");

router.post("/", roleController.checkUser, addressControllerG.addAddress);
router.get("/", roleController.checkUser, addressControllerG.getAllAddress);
router.patch("/:id", roleController.checkUser, addressControllerG.editAddress);
router.delete(
  "/:id",
  roleController.checkUser,
  addressControllerG.deleteAddress
);
router.patch(
  "/primary/:id",
  roleController.checkUser,
  addressControllerG.updatePrimary
);

module.exports = router;
