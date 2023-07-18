const express = require("express");
const router = express.Router();
const userController = require("../controllers").userController;

router.post("/reg", userController.register);
router.post("/auth", userController.login);
router.get("/", userController.getUser);
router.get("/send-email-verify", userController.verifyEmail);
router.patch(
  "/verify",
  userController.getIdByToken,
  userController.successVerif
);
router.get(
  "/id-token",
  userController.getIdByToken,
  userController.getUserByToken
);

module.exports = router;
