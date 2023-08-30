const express = require("express");
const branchController = require("../controllers").branchController;
const router = express.Router();
const roleController = require("../middleware/checkRole");

router.get(
  "/all-branch",
  roleController.checkAllAdmin,
  branchController.getAll
);

router.get(
  "/count",
  roleController.checkAllAdmin,
  branchController.countBranch
);

router.post(
  "/all-branch-filter",
  roleController.checkAllAdmin,
  branchController.getAllFilter
);

router.get("/getbranch", branchController.getAllBranchName);

router.get(
  "/all-by-branch",
  roleController.checkAllAdmin,
  branchController.getbyAll
);

router.post("/", roleController.checkSuper, branchController.addBranchAdmin);

router.patch(
  "/",
  roleController.checkSuper,
  branchController.updateAdminBranch
);

router.delete(
  "/",
  roleController.checkSuper,
  branchController.deleteBranchAdmin
);

router.get(
  "/selector",
  roleController.checkSuper,
  branchController.getSelector
);

router.get("/selector-category", branchController.getSelectorCategory);
router.get("/selector-feature", branchController.getSelectorFeature);

module.exports = router;
