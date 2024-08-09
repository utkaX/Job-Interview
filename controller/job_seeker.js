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

        res.status(200).send("Your data was added successfully.");
    } catch (error) {
        console.log(error);
        res.status(500).send("An error occurred.");
    }
};