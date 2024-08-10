const User = require("../models/user");

exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("error che bhai user nathi batavta.");
    }
};