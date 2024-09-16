const Interview = require("../models/interview"); 
const { response } = require("express");



exports.createInterview=async (req, res) => {
    try {
       
        const interviews = req.body; 
        const savedInterviews = await Interview.insertMany(interviews);
        res.status(201).json(savedInterviews);
      } catch (error) {
        res.status(400).json({ message: 'Error creating interviews', error });
      }
};


exports.getAllInterview=async (req, res) => {
    try {
        const interviews = await Interview.find().populate('appliedJobId').populate('interviewers');
        res.status(200).json(interviews);
      } catch (error) {
        res.status(400).json({ message: 'Error fetching interviews', error });
      }
};

exports.getInterviewById= async (req, res) => {
    try {
        const interview = await Interview.findById(req.params.id).populate('appliedJobId').populate('interviewers');
        if (!interview) {
          return res.status(404).json({ message: 'Interview not found' });
        }
        res.status(200).json(interview);
      } catch (error) {
        res.status(400).json({ message: 'Error fetching interview', error });
      }
};

exports.updateInterviewById=async (req, res) => {
    try {
        const updatedInterview = await Interview.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('appliedJobId').populate('interviewers');
        if (!updatedInterview) {
          return res.status(404).json({ message: 'Interview not found' });
        }
        res.status(200).json(updatedInterview);
      } catch (error) {
        res.status(400).json({ message: 'Error updating interview', error });
      }

}

exports.deleteInterviewById=async (req, res) => {
    try {
        const deletedInterview = await Interview.findByIdAndDelete(req.params.id);
        if (!deletedInterview) {
          return res.status(404).json({ message: 'Interview not found' });
        }
        res.status(200).json({ message: 'Interview deleted successfully' });
      } catch (error) {
        res.status(400).json({ message: 'Error deleting interview', error });
      }
    }


