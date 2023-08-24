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
router.get("/primary", roleController.checkUser, addressControllerG.getPrimary);
router.patch(
  "/primary/:id",
  roleController.checkUser,
  addressControllerG.updatePrimary
);
router.get("/current", roleController.checkUser, addressControllerG.getCurrent);
router.patch(
  "/current/:id",
  roleController.checkUser,
  addressControllerG.updateCurrent
);

module.exports = router;
