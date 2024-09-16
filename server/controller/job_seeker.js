    const JobSeeker = require("../models/jobseeker"); 
    const { response } = require("express");


    exports.addjobseeker = async (req, res) => {
        try {
          const {
            user, 
            firstName, 
            lastName, 
            bio, 
            education, 
            experience, 
            skills, 
            location, 
            profilePicture, 
            availability, 
            preferredJobLocations, 
            jobTypePreferences 
          } = req.body;
      
          // Validate required fields
          if (!user || !firstName || !lastName) {
            return res.status(400).send("Required fields are missing.");
          }
      
          const response = await JobSeeker.create({
            user, 
            firstName,
            lastName,
            bio,
            education,
            experience,
            skills,
            location,
            profilePicture,
            availability,
            preferredJobLocations,
            jobTypePreferences,
          });
      
          res.status(200).send("Profile added successfully!");
        } catch (error) {
          console.error("Error adding job seeker:", error);
          res.status(500).send("An error occurred while adding the profile.");
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