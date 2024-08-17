const Job = require('../models/job');
const { response } = require("express");



exports.createJob=async (req, res) => {
    try {
        const job = new Job(req.body);
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllJob= async (req, res) => {
    try {
        const jobs = await Job.find()
            .populate('employerId')
            .populate('jobType');
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getJobById= async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .populate('employerId')
            .populate('jobType');
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateJob= async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.deleteJob= async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};