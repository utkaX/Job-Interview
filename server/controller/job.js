const Job = require('../models/job');
const { response } = require("express");



exports.createJobs = async (req, res) => {
    try {
        // Check if the request body is an array or a single job
        if (Array.isArray(req.body)) {
            // Handle multiple jobs
            const jobs = await Job.insertMany(req.body);
            res.status(201).json(jobs);
        } else {
            // Handle a single job
            const job = new Job(req.body);
            await job.save();
            res.status(201).json(job);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllJob= async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.getJobByTitle = async (req, res) => {
    try {
        const job = await Job.findOne({ title: req.params.title });
        if (!job) return res.status(404).json({ error: 'Job not found' });
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.updateJobByTitle = async (req, res) => {
    try {
        const { title } = req.params; // Extract title from request parameters
        const updateData = req.body; // Data to update

        // Find and update the job by title
        const job = await Job.findOneAndUpdate({ title }, updateData, {
            new: true,
            runValidators: true
        });

        if (!job) return res.status(404).json({ error: 'Job not found' });

        res.status(200).json(job);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteJobByTitle = async (req, res) => {
    try {
        const { title } = req.params; // Extract title from request parameters
        
        // Find and delete the job by title
        const job = await Job.findOneAndDelete({ title });

        if (!job) return res.status(404).json({ error: 'Job not found' });

        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
