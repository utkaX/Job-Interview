const Company = require("../models/company"); // Changed to 'JobSeeker' to match the model name
const { response } = require("express");


exports.createCompany = async (req, res) => {
    try {

      if (Array.isArray(req.body)) {
       
        const savedCompanies = await Company.insertMany(req.body);
        res.status(201).json(savedCompanies);
      } else {
     
        const newCompany = new Company(req.body);
        const savedCompany = await newCompany.save();
        res.status(201).json(savedCompany);
      }
    } catch (error) {
      res.status(400).json({ message: 'Error creating companies', error });
    }
  };


exports.getAllCompanies = async (req, res) => {
    try {
      const companies = await Company.find();
      res.status(200).json(companies);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching companies', error });
    }
  };


exports.getCompanyById = async (req, res) => {
    try {
      const company = await Company.findById(req.params.id);
      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
      res.status(200).json(company);
    } catch (error) {
      res.status(400).json({ message: 'Error fetching company', error });
    }
  };


exports.updateCompany = async (req, res) => {
    try {
      const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedCompany) {
        return res.status(404).json({ message: 'Company not found' });
      }
      res.status(200).json(updatedCompany);
    } catch (error) {
      res.status(400).json({ message: 'Error updating company', error });
    }
  };


exports.deleteCompany=async (req, res) => {
    try {
        const company = await Company.findByIdAndDelete(req.params.id);
        if (!company) return res.status(404).json({ error: 'Company not found' });
        res.status(200).json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
