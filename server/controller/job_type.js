const jobType=require("../models/jobtype")
const { response } = require("express");


exports.getAllJobType=async (req, res) => {
    try {
        const jobTypes = await JobType.find();
        res.status(200).json(jobTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.createJobType=async (req, res) => {
    try {
        const jobType = new JobType(req.body);
        await jobType.save();
        res.status(201).json(jobType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.getJobTypeById= async (req, res) => {
    try {
        const jobType = await JobType.findById(req.params.id);
        if (!jobType) return res.status(404).json({ error: 'JobType not found' });
        res.status(200).json(jobType);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateJobType= async (req, res) => {
    try {
        const jobType = await JobType.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!jobType) return res.status(404).json({ error: 'JobType not found' });
        res.status(200).json(jobType);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteJobType=async (req, res) => {
    try {
        const jobType = await JobType.findByIdAndDelete(req.params.id);
        if (!jobType) return res.status(404).json({ error: 'JobType not found' });
        res.status(200).json({ message: 'JobType deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}