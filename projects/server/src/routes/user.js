const express = require("express");
const { fileUploader } = require("../middleware/multer");
const router = express.Router();
const userController = require("../controllers").userController;

router.post("/reg", userController.register);
router.post("/auth", userController.login);
router.get("/all-admin", userController.getAllRoleAdmin);
router.get("/", userController.getUser);
router.get("/send-email-verify", userController.verifyEmail);
router.get("/send-email-respass", userController.resetPassMail);
router.patch(
  "/verify",
  userController.getIdByToken,
  userController.successVerif
);
router.patch(
  "/reset-pass-login",
  userController.getIdByToken,
  userController.resetPassLogin
);
router.get(
  "/id-token",
  userController.getIdByToken,
  userController.getUserByToken
);
router.patch(
  "/avatar/:id",
  fileUploader({ destinationFolder: "Avatar" }).single("Avatar"),
  userController.uploadAvatar
);

router.patch("/:id", userController.editUser);
router.patch("/change-pass/:id", userController.changePass);
router.patch("/reset-pass/:id", userController.resetPass);

module.exports = router;
