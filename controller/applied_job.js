const JobSeeker = require("../models/appliedJob"); // Changed to 'JobSeeker' to match the model name
const { response } = require("express");


exports.createApplyJob= async (req, res) => {
    try {
        const appliedJob = new AppliedJob(req.body);
        await appliedJob.save();
        res.status(201).json(appliedJob);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


exports.getAllAppliedJob=async (req, res) => {
    try {
        const appliedJobs = await AppliedJob.find()
            .populate('jobSeekerId')
            .populate('jobId');
        res.status(200).json(appliedJobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.getAppliedJob=async (req, res) => {
    try {
        const appliedJob = await AppliedJob.findById(req.params.id)
            .populate('jobSeekerId')
            .populate('jobId');
        if (!appliedJob) return res.status(404).json({ error: 'AppliedJob not found' });
        res.status(200).json(appliedJob);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.updateAppliedJob=async (req, res) => {
    try {
        const appliedJob = await AppliedJob.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!appliedJob) return res.status(404).json({ error: 'AppliedJob not found' });
        res.status(200).json(appliedJob);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}



exports.deleteAppliedJob= async (req, res) => {
    try {
        const appliedJob = await AppliedJob.findByIdAndDelete(req.params.id);
        if (!appliedJob) return res.status(404).json({ error: 'AppliedJob not found' });
        res.status(200).json({ message: 'AppliedJob deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
