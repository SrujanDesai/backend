const express = require("express");
const {
  getAllUsers,
  getAllBookedCars,
} = require("../controllers/adminController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route to get all registered users
router.get("/users", requireSignIn, isAdmin, getAllUsers);

// Route to get all booked cars from all users
router.get("/bookings", requireSignIn, isAdmin, getAllBookedCars);

module.exports = router;
