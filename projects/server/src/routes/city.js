const express = require("express")
const router = express.Router()
const cityController =require ("../controllers").cityController


router.get("/:id", cityController.getCity)
router.get("/city", cityController.addCityData)
router.post("/", cityController.addCityData);
module.exports = router
