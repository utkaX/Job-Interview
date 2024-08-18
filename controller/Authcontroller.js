const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
    try {
        const { email, password, role, profilePicture } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error in password hashing'
            });
        }

        const newUser = await User.create({
            email,
            password: hashedPassword,
            role,
            profilePicture
        });

        res.status(200).json({
            success: true,
            message: 'User created successfully'
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'User cannot be registered, please try again later'
        });
    }
};
