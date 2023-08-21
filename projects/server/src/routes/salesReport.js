const express = require("express")
const router = express.Router()
const salesReportController = require("../controllers").salesReportController

router.get("/", salesReportController.allDataOrder)
router.post("/all", salesReportController.getAll)

module.exports = router