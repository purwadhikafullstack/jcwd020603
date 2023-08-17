const express = require("express");
const router = express.Router();
const { fileUploader } = require("../middleware/multer");
const categoryControllerB = require("../controllers").categoryControllerB;
const roleController = require("../middleware/checkRole");

//get

router.get("/", categoryControllerB.getAll);
router.get("/admin", categoryControllerB.getAllAdmin);
router.post(
  "/v1",
  roleController.checkSuper,
  fileUploader({ destinationFolder: "categoryImg" }).single("categoryImg"),
  categoryControllerB.insertCategory
);
router.patch(
  "/v2/:id",
  roleController.checkSuper,
  fileUploader({ destinationFolder: "categoryImg" }).single("categoryImg"),
  categoryControllerB.editCategory
);
router.delete(
  "/v3/:id",
  roleController.checkSuper,
  categoryControllerB.deleteCategory
);
router.get("/:id", categoryControllerB.getById);

module.exports = router;
