const express = require("express");
const router = express.Router();
const { 
    createUser,
    getUserById,
    getAllUser, 
    updateUser,
    deleteUser } = require("./controller/usercontroller");

router.post("/", createUser);//create user
router.get("/:id",getUserById);//get user by id
router.get("/all", getAllUser);//read all the users
router.put("/user/:id",updateUser)//update user
router.delete("/user/:id",deleteUser);//delete user

module.exports = router;
