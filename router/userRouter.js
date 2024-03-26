const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  getUserProfile,
  updateUserProfile,
  bookCar,
  cancelBooking,
  listUserBookings,
} = require("../controllers/userController");

const router = express.Router();

// Route to get user profile by ID
router.get("/profile/:id", requireSignIn, getUserProfile);

// Route to update user profile by ID
router.put("/edit/profile/:id", requireSignIn, updateUserProfile);

// Route to book a car
router.post("/book-car", requireSignIn, bookCar);

// Route to cancel a booking
router.post("/cancel-booking", requireSignIn, cancelBooking);

// Route to list user's bookings
router.get("/bookings", requireSignIn, listUserBookings);

module.exports = router;
