const express = require("express");
const router = express.Router();
const { 
    createUser,
    getAllUser, 
    updateUser,
    deleteUser, 
    getUserByEmail} = require("../controller/usercontroller");

router.post("/addUser", createUser);//create user
router.get("/getUserByEmail/:email",getUserByEmail);//get user by id
router.get("/getAllUser/", getAllUser);//read all the users
router.put("/updateUserByEmail/:email",updateUser);//update user
router.delete("/deleteUserByEmail/:email",deleteUser);//delete user



module.exports = router;
