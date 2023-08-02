const express = require("express")
const router = express.Router()
const provinceController = require("../controllers").provinceController


router.get("/", provinceController.getProvince)
router.get("/province", provinceController.addProvinceData)

module.exports = router