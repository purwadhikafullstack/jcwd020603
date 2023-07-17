const express = require("express");
const router = express.Router();
const categoryControllerB = require("../controllers").categoryControllerB;
//get

router.get("/", categoryControllerB.getAll);
router.post("/v1", categoryControllerB.insertCategory);
router.patch("/v2/:id", categoryControllerB.editCategory);
router.delete("/v3/:id", categoryControllerB.deleteCategory);
router.get("/:id", categoryControllerB.getById);

module.exports = router;
