const JobSeeker = require("../models/jobseeker"); 
const { response } = require("express");
const mongoose = require('mongoose');


exports.createJobSeeker = async (req, res) => {
    try {
        const newJobSeeker = new JobSeeker(req.body);
        const savedJobSeeker = await newJobSeeker.save();
        res.status(201).json(savedJobSeeker);
    } catch (err) {
        res.status(500).json({ message: 'Error creating job seeker', error: err.message });
    }
};

exports.getAllJobSeekers = async (req, res) => {
    try {
        const jobSeekers = await JobSeeker.find(); // Fetch all job seekers from the database
        res.status(200).json(jobSeekers);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching job seekers', error: err.message });
    }
};



exports.getJobSeekerByUserId = async (req, res) => {
    const userId = req.params.id; // Assuming your URL uses /:id instead of /:userId

    // Check if the provided userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    try {
        const jobSeeker = await JobSeeker.findOne({ user: userId })
            .populate('user') // Populate the User data if needed
            .exec(); // Execute the query

        if (!jobSeeker) {
            return res.status(404).json({ message: 'Job seeker not found' });
        }

        res.status(200).json(jobSeeker);
    } catch (err) {
        console.error('Error fetching job seeker:', err);
        res.status(500).json({ message: 'Server error while fetching job seeker', error: err.message });
    }
};



// Update a job seeker by ID
exports.updateJobSeekerById = async (req, res) => {
    try {
        const updatedJobSeeker = await JobSeeker.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // Options: new returns the updated document, runValidators validates the update
        );
        if (!updatedJobSeeker) return res.status(404).json({ message: 'Job seeker not found' });
        res.status(200).json(updatedJobSeeker);
    } catch (err) {
        res.status(500).json({ message: 'Error updating job seeker', error: err.message });
    }
};


exports.deleteJobSeeker = async (req, res) => {
    try {
        const deletedJobSeeker = await JobSeeker.findByIdAndDelete(req.params.id);
        if (!deletedJobSeeker) return res.status(404).json({ message: 'Job Seeker not found' });
        res.status(200).json({ message: 'Job Seeker deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting job seeker', error: err.message });
    }
};