const jwt = require("jsonwebtoken");
const User = require("../models/user");

//Protecting routes based on token
const requireSignIn = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided" });
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //pass this token to user
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "error in requireSignIn",
      error,
    });
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    //Check the role
    if (user.role !== 1) {
      return res.status().send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Invalid Token",
      error,
    });
  }
};

module.exports = {
  requireSignIn,
  isAdmin,
};
