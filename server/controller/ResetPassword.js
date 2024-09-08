const crypto = require("crypto");
const User = require("../models/user");
const { mailSender } = require("../utils/mailSender");
const bcrypt = require("bcrypt");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const token = crypto.randomUUID();

    // Update user with reset token and expiry time
    const updateDetails = await User.findOneAndUpdate(
      { email: email },
      {
        resetPasswordToken: token,
        resetPasswordExpires: Date.now() + 300 * 1000, // Token expires in 5 minutes
      },
      { new: true }
    );

    const URL = `http://localhost:8080/auth/update-password/${token}`;

    // Send email with reset URL
    await mailSender(
      email,
      "Password Reset Request",
      `You requested a password reset. Please click the link to reset your password: ${URL}`
    );

    res.status(200).json({
      success: true,
      message: "Password reset email sent",
      URL,
    });
  } catch (error) {
    console.error("Error during reset password token generation:", error);
    res.status(500).json({
      success: false,
      message: "Error in sending reset password email",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    // Validate required fields
    if (!token || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate password and confirm password match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Find user by token and check if token is not expired
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Token should be valid and not expired
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and remove reset token and expiry
    await User.findOneAndUpdate(
      { resetPasswordToken: token },
      {
        password: hashedPassword,
        resetPasswordToken: null, // Clear the token
        resetPasswordExpires: null, // Clear the expiry time
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error during password reset:", error);
    res.status(500).json({
      success: false,
      message: "Error in resetting password",
    });
  }
};
