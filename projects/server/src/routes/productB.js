const express = require("express");
const router = express.Router();
const { fileUploader } = require("../middleware/multer");
const productControllerB = require("../controllers").productControllerB;
//get

router.get("/", productControllerB.getAll);
router.post(
  "/v1",
  fileUploader({ destinationFolder: "productImg" }).single("productImg"),
  productControllerB.insertProduct
);
router.patch(
  "/v2/:id",
  fileUploader({ destinationFolder: "productImg" }).single("productImg"),
  productControllerB.editProduct
);
router.delete("/v3/:id", productControllerB.deleteProduct);

module.exports = router;
