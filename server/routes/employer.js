const express = require('express');
const router = express.Router();


const{
    createEmployee,
    getAllEmployee,
    getEmployerByCompanyName,
    updateEmployee,
    deleteEmployee}=require("../controller/employer")


router.post("/addEmployee",createEmployee)
router.get("/getAllEmployee",getAllEmployee)
router.get("getEmployeeByCompanyName/:companyName",getEmployerByCompanyName)
router.put("/updateEmployee/:id",updateEmployee)
router.delete("/deleteEmployeeById/:id",deleteEmployee)


module.exports=router