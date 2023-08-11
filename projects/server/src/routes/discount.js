const express = require ("express")
const router = express.Router()
const discountController = require("../controllers").discountController
// const roleController = require("../middleware/checkRole")


router.get("/all", discountController.getAll)
router.post("/", discountController.addDiscount)
router.patch("/", discountController.updateDiscount)
router.delete("/", discountController.deleteDiscount)

module.exports = router


