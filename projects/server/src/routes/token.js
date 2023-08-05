const express = require("express")
const router = express.Router()
const tokenController =require("../controllers").tokenController


router.patch("/", tokenController.updateToken)
router.get("/", tokenController.getTken)


module.exports = router