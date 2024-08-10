const JobSeeker = require("../models/jobseeker"); // Changed to 'JobSeeker' to match the model name

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