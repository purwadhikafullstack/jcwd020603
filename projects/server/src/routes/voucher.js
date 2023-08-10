const express = require("express")
const router = express.Router()
const voucerController = require("../controllers").voucerController


router.get("/", voucerController.getAll)
router.post("/", voucerController.addVoucher)
router.patch("/", voucerController.updateVoucher)
router.delete("/", voucerController.deleteVoucher)
module.exports = router