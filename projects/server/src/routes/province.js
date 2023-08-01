const express = require("express");
const router = express.Router();
const provinceController = require("../controllers").provinceController;

router.get("/", provinceController.getProvince);
router.post("/", provinceController.addProvinceData);

module.exports = router;
