const express = require("express");
const {
  getAllUsers,
  getAllBookedCars,
} = require("../controllers/adminController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/users", requireSignIn, isAdmin, getAllUsers);
router.get("/bookings", requireSignIn, isAdmin, getAllBookedCars);

module.exports = router;
