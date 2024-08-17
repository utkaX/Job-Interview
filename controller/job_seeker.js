const JobSeeker = require("../models/jobseeker"); // Changed to 'JobSeeker' to match the model name
const { response } = require("express");


exports.addjobseeker = async (req, res) => {
    try {
        const { userId, firstname, lastname, bio } = req.body;

        const response = await JobSeeker.create({ 
            "userId": userId,
            "firstName": firstname,
            "lastName": lastname,
            "bio": bio
          
           });

        res.status(200).send("data add thai gayo che");
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred.");
    }
};

exports.getAllJobSeekers = async (req, res) => {
    try {
        const jobSeekers = await JobSeeker.find();
        res.status(200).json(jobSeekers);
    } catch (error) {
        console.log(error);
        res.status(500).send("error che bhai.");
    }
};


exports.getJobSeekerById=async (req, res) => {
    try {
        const jobSeeker = await JobSeeker.findById(req.params.id).populate('userId').populate('savedJobs').populate('appliedJobs.jobId');
        if (!jobSeeker) return res.status(404).json({ error: 'JobSeeker not found' });
        res.status(200).json(jobSeeker);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateJobSeeker=async (req, res) => {
    try {
        const jobSeeker = await JobSeeker.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!jobSeeker) return res.status(404).json({ error: 'JobSeeker not found' });
        res.status(200).json(jobSeeker);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteJobSeeker= async (req, res) => {
    try {
        const jobSeeker = await JobSeeker.findByIdAndDelete(req.params.id);
        if (!jobSeeker) return res.status(404).json({ error: 'JobSeeker not found' });
        res.status(200).json({ message: 'JobSeeker deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};