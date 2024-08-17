const express = require("express");
const router = express.Router();
const { 
    createUser,
    getUserById,
    getAllUser, 
    updateUser,
    deleteUser } = require("../controller/usercontroller");

router.post('/users', createUser);//create user
router.get("/user/:id",getUserById);//get user by id
router.get("/users", getAllUser);//read all the users
router.put("/user/:id",updateUser)//update user
router.delete("/user/:id",deleteUser);//delete user

module.exports = router;
