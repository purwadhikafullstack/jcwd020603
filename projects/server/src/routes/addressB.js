const express = require("express");
const router = express.Router();
const addressControllerB = require("../controllers").addressControllerB;

router.get("/", addressControllerB.getAddress);

module.exports = router;
