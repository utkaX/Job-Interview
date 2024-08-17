const { response } = require("express");
const User = require("../models/user");



exports.createUser =
    async (req, res) => {
        try {
            
            const { email, password, role, profilePicture } = req.body;
            const user = new User({ email, password, role, profilePicture });
            await user.save();       
            console.log("user route");

            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    };


//Read user
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("error che bhai user nathi batavta.");
    }
};


//create user

//get user by id
// Get user by ID
exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }); // Find user by email
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//update user
exports.updateUser = async (req, res) => {
    try {
        const { email, password, role, profilePicture } = req.body;
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (email) user.email = email;
        if (password) user.password = password; // Password will be hashed by the pre-save hook
        if (role) user.role = role;
        if (profilePicture) user.profilePicture = profilePicture;

        await user.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


//Delete user
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};