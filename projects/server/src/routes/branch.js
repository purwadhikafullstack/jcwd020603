const express = require("express");
const  branchController  = require("../controllers").branchController
const router = express.Router();
const roleController = require("../middleware/checkRole")

router.get("/all-branch", roleController.checkAllAdmin, branchController.getAll);
router.get("/all-by-branch", roleController.checkAllAdmin, branchController.getbyAll);

router.post("/", roleController.checkSuper, branchController.addBranchAdmin)

router.patch("/", roleController.checkSuper, branchController.updateAdminBranch)

router.delete("/", roleController.checkSuper, branchController.deleteBranchAdmin)

module.exports = router;
