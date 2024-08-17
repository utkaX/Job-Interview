const express = require("express");
const router = express.Router();
const { 
    createUser,
    getAllUser, 
    updateUser,
    deleteUser, 
    getUserByEmail} = require("../controller/usercontroller");

router.post("/", createUser);//create user
router.get("/:email",getUserByEmail);//get user by id
router.get("/", getAllUser);//read all the users
router.put("/:id",updateUser);//update user
router.delete("/:id",deleteUser);//delete user

module.exports = router;
