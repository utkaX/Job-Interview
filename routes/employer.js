const express = require('express');
const router = express.Router();


const{
    createEmployee,
    getAllEmployee,
    getEmployee,
    updateEmployee,
    deleteEmployee}=require("../controller/employer")


router.post("/createEmployee",createEmployee)
router.get("/getAllEmployee",getAllEmployee)
router.get("/getEmployee/:id",getEmployee)
router.put("/updateEmployee/:id",updateEmployee)
router.delete("/deleteEmployee/:id",deleteEmployee)


module.exports=router