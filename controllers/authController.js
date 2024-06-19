const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

///////////////////////////////////////////////////////////////////
exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      throw new Error("User already exits.");
    }

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    if (!name) {
      throw new Error("Please provide name");
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something went wrong");
    }

    const payload = {
      ...req.body,
      profilePicture: `https://avatar.iran.liara.run/public`,
      password: hashPassword,
    };

    const userData = new User(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User Signed Up Successfully!",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
///////////////////////////////////////////////////////////////////
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }
    if (!user.active) {
      throw new Error("User is blocked");
    }

    const checkPassword = await bcrypt.compare(password, user.password);

    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      };
      const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 8,
      });

      res.status(200).json({
        message: "Login successfully",
        token,
        success: true,
        error: false,
        data: user,
      });
    } else {
      throw new Error("Please check Password");
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
//blockUser////////////////////////////////////////
exports.blockUser = async (req, res) => {
  try {
    const notice = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      data: notice,
      success: true,
      error: false,
      message: "User blocked",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};
//getAllUsers////////////////////////////////////////
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({
      createdAt: -1,
    });
    if (!users) {
      throw new Error("There is no users");
    }
    res.status(200).json({
      data: users,
      success: true,
      error: false,
      message: "Categories loaded",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};