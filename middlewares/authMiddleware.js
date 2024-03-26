const jwt = require("jsonwebtoken");
const User = require("../models/user");

// Middleware for user authentication and authorization

// Middleware to ensure that routes are protected based on token
const requireSignIn = async (req, res, next) => {
  // Extract token from request headers
  const token = req.headers.authorization.split(" ")[1];

  // Check if token exists
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided" });
  }

  try {
    // Verify the token
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // Pass decoded user information to the request object
    req.user = decode;
    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // Handle invalid token error
    res.status(401).send({
      success: false,
      message: "Error in requireSignIn",
      error,
    });
  }
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    // Find the user by ID from the request object
    const user = await User.findById(req.user._id);
    // Check the role of the user
    if (user.role !== 1) {
      return res.status().send({
        success: false,
        message: "Unauthorized Access",
      });
    } else {
      // Move to the next middleware or route handler
      next();
    }
  } catch (error) {
    // Handle errors related to invalid token or user not found
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
