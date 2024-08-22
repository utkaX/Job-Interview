const User = require("../models/user");
const bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { email, password, role, profilePicture } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error in password hashing",
      });
    }

    const newUser = await User.create({
      email,
      password: hashedPassword,
      role,
      profilePicture,
    });

    res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User cannot be registered, please try again later",
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

      console.log(user);
      user.token = token;
      user.password = undefined;
      console.log(user);
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
