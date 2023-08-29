const express = require ("express")
const router = express.Router()
const discountController = require("../controllers").discountController
const roleController = require("../middleware/checkRole")
const { fileUploader } = require("../middleware/multer")


router.get("/all", discountController.getAll)
router.post("/stock-discount", discountController.getAllDt)
router.post("/stock-selected", discountController.getAllSelected)
router.post("/", roleController.checkAdmin, discountController.addDiscount)
router.patch("/",roleController.checkAdmin, discountController.updateDiscount)
router.patch("/photo-discount/:id", fileUploader({destinationFolder : "PhotoDiscount"}).single("PhotoDiscount"),
discountController.uploadFotoDiscount)
router.delete("/", roleController.checkAdmin, discountController.deleteDiscount)

module.exports = router


