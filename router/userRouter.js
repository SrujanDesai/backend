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

router.get("/profile/:id", requireSignIn, getUserProfile);
router.put("/edit/profile/:id", requireSignIn, updateUserProfile);
router.post("/book-car", requireSignIn, bookCar);
router.post("/cancel-booking", requireSignIn, cancelBooking);
router.get("/bookings", requireSignIn, listUserBookings);

module.exports = router;
