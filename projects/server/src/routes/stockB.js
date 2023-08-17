const express = require("express");
const router = express.Router();
const stockControllerB = require("../controllers").stockControllerB;
const roleController = require("../middleware/checkRole");

router.get("/", stockControllerB.getAllStock);
router.get(
  "/admin",
  roleController.checkAllAdmin,
  stockControllerB.getAllStockAdmin
);
router.get("/s-category", stockControllerB.getAllStockByCategory);
router.get("/stockhistory", stockControllerB.getStockHistory);
router.get("/search", stockControllerB.searchStock);
router.post("/v1", roleController.checkAdmin, stockControllerB.insertStock);
router.patch("/v2/:id", roleController.checkAdmin, stockControllerB.editStock);
router.delete(
  "/v3/:id",
  roleController.checkAdmin,
  stockControllerB.deleteStock
);

module.exports = router;
