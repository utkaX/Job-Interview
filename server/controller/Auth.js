const User = require("../models/user");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const { mailSender } = require("../utils/mailSender");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    // Await the result of User.findOne
    const checkUserpresent = await User.findOne({ email });
    console.log(checkUserpresent);

    if (checkUserpresent) {
      return res.status(401).json({
        success: false,
        message: "User is already registered",
      });
    }

    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    const otpPayload = { email, otp };

    const otpBody = await OTP.create(otpPayload);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


exports.signup = async (req, res) => {
  try {
    const { email, password, role, otp } = req.body;

    if (!email || !password || !role || !otp) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const recentOtp = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invaild OTP",
      });
    }
    const newUser = await User.create({
      email,
      password,
      role,
    });
    // await newUser.save();
    console.log(newUser);

    recentOtp.used = true;
    await recentOtp.save();

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User cannot be registered, please try again later",
      error,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all the details carefully",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered",
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      let token = jwt.sign(payload, "kaan", {
        expiresIn: "2h",
      });

      user.token = token;
      user.password = undefined;

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("jobcookie", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "User login successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password incorrect",
      });
    }
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: "Error in login",
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await OTP.findOne({ email, otp, used: false });

    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid OTP or OTP expired" });
    }

    otpRecord.used = true;
    await otpRecord.save();

    // Optionally, you can now create the user or perform other actions
    res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    if (!email || !oldPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm password do not match",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    await mailSender(
      email,
      "Password Changed",
      "Your password has been changed successfully."
    );

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while changing the password",
    });
  }
};

// Example backend code for token verification
exports.verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "No token provided",
      });
    }

    const decoded = jwt.verify(token, "kaan"); // Replace "kaan" with your actual secret key
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(403).json({
      success: false,
      message: "Token verification failed",
    });
  }
};

