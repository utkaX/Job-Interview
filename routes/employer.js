const express = require('express');
const router = express.Router();


const{
    createEmployee,
    getAllEmployee,
    getEmployerByCompanyName,
    updateEmployee,
    deleteEmployee}=require("../controller/employer")


router.post("/",createEmployee)
router.get("/",getAllEmployee)
router.get("/:companyName",getEmployerByCompanyName)
router.put("/updateEmployee/:id",updateEmployee)
router.delete("/deleteEmployee/:id",deleteEmployee)


module.exports=router