const express = require("express");
const router = express.Router();
const stockControllerB = require("../controllers").stockControllerB;

router.get("/", stockControllerB.getAllStock);
router.get("/search", stockControllerB.searchStock);

module.exports = router;
