const express = require("express");
const router = express.Router();
const { fileUploader } = require("../middleware/multer");
const categoryControllerB = require("../controllers").categoryControllerB;
//get

router.get("/", categoryControllerB.getAll);
router.post(
  "/v1",
  fileUploader({ destinationFolder: "categoryImg" }).single("categoryImg"),
  categoryControllerB.insertCategory
);
router.patch(
  "/v2/:id",
  fileUploader({ destinationFolder: "categoryImg" }).single("categoryImg"),
  categoryControllerB.editCategory
);
router.delete("/v3/:id", categoryControllerB.deleteCategory);
router.get("/:id", categoryControllerB.getById);

module.exports = router;
