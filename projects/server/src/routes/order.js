const express = require("express");
const router = express.Router();
const orderController = require("../controllers").orderController;
const roleController = require("../middleware/checkRole");
const { fileUploader } = require("../middleware/multer");

router.get("/", roleController.checkUser, orderController.getAll);
router.get("/admin", roleController.checkAllAdmin, orderController.getAllAdmin);
router.get("/latest", roleController.checkUser, orderController.getByOrderId);
router.get("/specific", orderController.getByOrderNumber);
router.post("/", roleController.checkUser, orderController.postOrder);
router.patch(
  "/image/:id",
  roleController.checkUser,
  fileUploader({ destinationFolder: "paymentImg" }).single("paymentImg"),
  orderController.postPaymentImg
);
router.patch("/cancel/:id", orderController.cancelOrder);
router.patch(
  "/status/:id",
  roleController.checkAdmin,
  orderController.changeStatusOrder
);
router.patch(
  "/confirm/:id",
  roleController.checkUser,
  orderController.changeStatusOrder
);

module.exports = router;
