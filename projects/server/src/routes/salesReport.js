const express = require("express")
const salesReportUserController = require("../controllers").salesReportUserController
const salesReportProductController = require("../controllers").salesReportProductController
const router = express.Router()
const salesReportController = require("../controllers").salesReportController

// transaction
router.get("/", salesReportController.allDataOrder)
router.post("/all", salesReportController.getAll)
router.post("/allFilter", salesReportController.getAllFiltering)

// poduct
router.get("/dt-branch", salesReportProductController.getDtBranch)
router.get("/all-product", salesReportProductController.getAllProduct)
router.post("/sumqty", salesReportProductController.getProductBySUMqty)
router.post("/sumqty-forpage", salesReportProductController.getProductBySUMqtyForPagination)
router.post("/get-stock-branch", salesReportProductController.getStockBranch)

// user
router.post("/sum-userall", salesReportUserController.getUserBySUMTALL)
router.post("/sum-userall-pagination", salesReportUserController.getUserBySUMTALLPagination)

module.exports = router