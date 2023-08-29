const express = require("express");
const router = express.Router();
const { fileUploader } = require("../middleware/multer");
const productControllerB = require("../controllers").productControllerB;
const roleController = require("../middleware/checkRole");

//get

router.get("/", roleController.checkAllAdmin, productControllerB.getAll);
router.get(
  "/admin",
  roleController.checkAllAdmin,
  productControllerB.getAllAdmin
);
router.post(
  "/v1",
  roleController.checkSuper,
  fileUploader({ destinationFolder: "productImg" }).single("productImg"),
  productControllerB.insertProduct
);
router.patch(
  "/v2/:id",
  roleController.checkSuper,
  fileUploader({ destinationFolder: "productImg" }).single("productImg"),
  productControllerB.editProduct
);
router.delete(
  "/v3/:id",
  roleController.checkSuper,
  productControllerB.deleteProduct
);

router.get(
  "/selector",
  roleController.checkAllAdmin,
  productControllerB.getSelector
);

router.get("/:id", productControllerB.getById);
router.get("/category/:id", productControllerB.getByCategoryId);

module.exports = router;
