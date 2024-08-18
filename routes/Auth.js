const express = require("express");
const router = express.Router();
const {signup} = require("../controller/Authcontroller");

router.post("/signup", signup);


module.exports = router;
