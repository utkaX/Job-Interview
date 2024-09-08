const JobSeeker = require("../models/interview"); // Changed to 'JobSeeker' to match the model name
const { response } = require("express");



exports.createInterview=async (req, res) => {
    try {
        const interview = new Interview(req.body);
        await interview.save();
        res.status(201).json(interview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllInterview=async (req, res) => {
    try {
        const interviews = await Interview.find()
            .populate('appliedJobId')
            .populate('interviewers');
        res.status(200).json(interviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getInterview= async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id)
            .populate('appliedJobId')
            .populate('interviewers');
        if (!interview) return res.status(404).json({ error: 'Interview not found' });
        res.status(200).json(interview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateInterview=async (req, res) => {
    try {
        const interview = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!interview) return res.status(404).json({ error: 'Interview not found' });
        res.status(200).json(interview);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}


exports.deleteInterview=async (req, res) => {
    try {
        const interview = await Interview.findByIdAndDelete(req.params.id);
        if (!interview) return res.status(404).json({ error: 'Interview not found' });
        res.status(200).json({ message: 'Interview deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

