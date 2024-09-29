const express = require('express');
const router = express.Router();


const{
    createEmployee,
    getAllEmployee,
    getEmployerByUserId,
    updateEmployee,
    getEmployerById,
    deleteEmployee,
    getTopCompanies
}=require("../controller/employer")


router.post("/addEmployee",createEmployee)
router.get("/getAllEmployee",getAllEmployee)
router.get("/getEmployerByUserId/:id",getEmployerByUserId)
router.put("/updateEmployee/:id",updateEmployee)
router.delete("/deleteEmployeeById/:id",deleteEmployee)
router.get('/:id', getEmployerById);
router.get('/top-companies', getTopCompanies);


module.exports=router