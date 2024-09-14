const express = require("express");
const router = express.Router();
const { 
    createUser,
    getAllUser, 
    updateUser,
    deleteUser, 
    getUserByEmail} = require("../controller/usercontroller");

router.post("/", createUser);//create user
router.get("/:email",getUserByEmail);//get user by email
router.get("/", getAllUser);//read all the users
router.put("/:email",updateUser);//update user
router.delete("/:email",deleteUser);//delete user



module.exports = router;
