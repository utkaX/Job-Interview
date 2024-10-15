const Employer = require("../models/employer");
const Job = require("../models/job"); 
const { response } = require("express");

exports.createEmployee=async (req, res) => {
    try {
        const employer = new Employer(req.body);
        await employer.save();
        res.status(201).json(employer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.getAllEmployee=async (req, res) => {
    try {
        const employers = await Employer.find().populate('userId').populate('jobsPosted');
        res.status(200).json(employers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.getEmployerByCompanyName = async (req, res) => {
    try {
        const { companyName } = req.params; // Extract companyName from request parameters
        
        // Find the employer by companyName
        const employer = await Employer.findOne({ companyName });
        if (!employer) return res.status(404).json({ error: 'Employer not found' });

        res.status(200).json(employer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getEmployerById = async (req, res) => {
    try {
        const employerId = req.params.id;
                
        const employer = await Employer.findById(employerId);
        
        if (!employer) {
            return res.status(404).json({ error: 'Employer not found' });
        }

        res.status(200).json(employer);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ error: error.message });
    }
};

exports.getEmployerByUserId = async (req, res) => {
    try {
      const userId = req.params.id; // Extracting userId from request parameters  
    
      const employer = await Employer.findOne({ userId }).populate("jobsPosted"); // Populate jobsPosted if needed
  
      if (!employer) {
        return res.status(404).json({ message: "Employer not found" });
      }
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }
  
  
      res.status(200).json(employer);
    } catch (error) {
      console.error("Error fetching employer:", error);
      res.status(500).json({ error: "An error occurred while fetching employer data." });
    }
  };


exports.updateEmployee= async (req, res) => {
    try {
        const employer = await Employer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!employer) return res.status(404).json({ error: 'Employer not found' });
        res.status(200).json(employer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

exports.deleteEmployee=async (req, res) => {
    try {
        const employer = await Employer.findByIdAndDelete(req.params.id);
        if (!employer) return res.status(404).json({ error: 'Employer not found' });
        res.status(200).json({ message: 'Employer deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

exports.getTopCompanies = async (req, res) => {
    try {
        const topCompanies = await Job.aggregate([
            {
                $match: { isLive: true } // Filter for active jobs
            },
            {
                $group: {
                    _id: "$employerId", // Group by employerId
                    jobCount: { $sum: 1 } // Count the number of jobs
                }
            },
            {
                $sort: { jobCount: -1 } // Sort by jobCount in descending order
            },
            {
                $limit: 5 // Get top 5 companies
            },
            {
                $addFields: { 
                    _id: { $toObjectId: "$_id" } // Convert employerId to ObjectId
                }
            },
            {
                $lookup: {
                    from: "employers", // The collection name for employers
                    localField: "_id", // This is now converted to ObjectId
                    foreignField: "_id", // _id in the employers collection
                    as: "employerDetails"
                }
            },
            {
                $unwind: "$employerDetails" // Unwind to flatten the employer details
            },
            {
                $project: {
                    _id: 0, // Exclude _id from output
                    companyName: "$employerDetails.companyName",
                    jobCount: 1
                }
            }
        ]);

        res.status(200).json(topCompanies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
