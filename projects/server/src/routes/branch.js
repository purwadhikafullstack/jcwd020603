const express = require("express");
const  branchController  = require("../controllers").branchController
const router = express.Router();

router.get("/all-branch", branchController.getAll);
router.get("/all-by-branch", branchController.getbyAll);

router.post("/", branchController.addBranchAdmin)

router.delete("/", branchController.delteBranchAdmin)

module.exports = router;
