const express = require('express');
const router = express.Router();


const{
    createEmployee,
    getAllEmployee,
    getEmployerByCompanyName,
    updateEmployee,
    getEmployerById,
    getEmployerByUserId,
    deleteEmployee,
    getTopCompanies
}=require("../controller/employer")


router.post("/addEmployee",createEmployee)
router.get("/getAllEmployee",getAllEmployee)
router.get("getEmployeeByCompanyName/:companyName",getEmployerByCompanyName)
router.get("/getEmployerByUserId/:id",getEmployerByUserId)
router.put("/updateEmployee/:id",updateEmployee)
router.delete("/deleteEmployeeById/:id",deleteEmployee)
router.get('/:id', getEmployerById);
router.get('/top-companies', getTopCompanies);


module.exports=router