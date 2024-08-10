const express = require("express");
const router = express.Router();
const { getAllUser } = require("../controller/usercontroller");

router.get("/users", getAllUser);

module.exports = router;
