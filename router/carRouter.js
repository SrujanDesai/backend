const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const {
  listCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
} = require("../controllers/carController");

const router = express.Router();

// Route to list all available cars
router.get("/", listCars);

// Route to get details of a specific car by ID
router.get("/:id", getCar);

// Route to add a new car (accessible only by admins)
router.post("/add", requireSignIn, isAdmin, createCar);

// Route to edit details of a car by ID (accessible only by admins)
router.put("/edit/:id", requireSignIn, isAdmin, updateCar);

// Route to delete a car by ID (accessible only by admins)
router.delete("/delete/:id", requireSignIn, isAdmin, deleteCar);

module.exports = router;
