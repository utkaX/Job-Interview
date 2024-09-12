const AppliedJob = require("../models/appliedJob"); 
const { response } = require("express");


exports.createAppliedJob = async (req, res) => {
    try {
      const newAppliedJob = new AppliedJob(req.body);
      const savedAppliedJob = await newAppliedJob.save();
      res.status(201).json(savedAppliedJob);
    } catch (error) {
      res.status(400).json({ message: 'Error creating job application', error });
    }
  };

exports.getAllAppliedJobs = async (req, res) => {
    try {
      const appliedJobs = await AppliedJob.find();
      res.status(200).json(appliedJobs);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching job applications', error });
    }
  };


exports.getAppliedJobById = async (req, res) => {
    try {
      const appliedJob = await AppliedJob.findById(req.params.id);
      if (!appliedJob) return res.status(404).json({ message: 'AppliedJob not found' });
      res.status(200).json(appliedJob);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching job application', error });
    }
  };


exports.updateAppliedJob = async (req, res) => {
    try {
      const updatedAppliedJob = await AppliedJob.findByIdAndUpdate(req.params.id, req.body, { new: true });
      //console.log(updatedAppliedJob)
      if (!updatedAppliedJob) return res.status(404).json({ message: 'AppliedJob not found' });
      res.status(200).json(updatedAppliedJob);
    } catch (error) {
      res.status(400).json({ message: 'Error updating job application', error });
    }
  };


exports.deleteAppliedJob = async (req, res) => {
    try {
      const deletedAppliedJob = await AppliedJob.findByIdAndDelete(req.params.id);
      if (!deletedAppliedJob) return res.status(404).json({ message: 'AppliedJob not found' });
      res.status(200).json({ message: 'AppliedJob deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting job application', error });
    }
  };
