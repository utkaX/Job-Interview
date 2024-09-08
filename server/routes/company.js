const express = require('express');
const router = express.Router();


const{
    createCompany,
    getAllCompany,
    getCompany,
    updateCompany,
    deleteCompany}=require("../controller/company")


router.post("/createCompany",createCompany)
router.get("/getAllCompany",getAllCompany)
router.get("/getCompany/:id",getCompany)
router.put("/updateCompany/:id",updateCompany)
router.delete("/deleteCompany/:id",deleteCompany)


module.exports=router