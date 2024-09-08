const JobSeeker = require("../models/feedback"); // Changed to 'JobSeeker' to match the model name
const { response } = require("express");


exports.createFeedback= async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).json(feedback);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.getAllFeedback=async (req, res) => {
    try {
        const feedbacks = await Feedback.find().populate('userId');
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


exports.getFeedback=async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id).populate('userId');
        if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
        res.status(200).json(feedback);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateFeedback=async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
        res.status(200).json(feedback);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteFeedback=async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) return res.status(404).json({ error: 'Feedback not found' });
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


