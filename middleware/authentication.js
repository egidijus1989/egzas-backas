const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/userModel");

async function authToken(req, res, next) {
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw new Error("User not authenticated");
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log("decoded", decoded);

    const currentUser = await User.findById(decoded._id);
    // console.log("currentUser:", currentUser);
    if (!currentUser) {
      throw new Error("user not exist");
    }

    req.user = currentUser;
    next();
  } catch (err) {
    res.status(400).json({
      status: "Fail",
      message: err.message,
    });
  }
}

module.exports = authToken;
