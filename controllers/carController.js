const Car = require("../models/car");

// Function to list all available cars
const listCars = async (req, res) => {
  try {
    // Retrieve all available cars from the database
    const cars = await Car.find({ available: true });
    // Return the list of cars
    res.status(200).json({ data: cars });
  } catch (error) {
    // Handle server error
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to get details of a specific car
const getCar = async (req, res) => {
  try {
    // Find the car by ID
    const car = await Car.findById(req.params.id);
    // If car is not found, return error
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    // Return car details
    res.status(200).json({ data: car });
  } catch (error) {
    // Handle server error
    res.status(500).json({ message: "Internal server error" });
  }
};

// Function to create a new car
const createCar = async (req, res) => {
  try {
    // Create new car instance
    const newCar = new Car(req.body);

    // Save the new car
    await newCar.save();
    // Return success message and created car data
    res.status(201).json({ message: "Car created successfully", data: newCar });
  } catch (error) {
    console.error("Error in creating car:", error);
    // Handle client error
    res.status(400).json({ message: error.message });
  }
};

// Function to update details of a car
const updateCar = async (req, res) => {
  try {
    // Find the car by ID and update
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    // If car is not found, return error
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Return success message and updated car data
    res.status(200).json({ message: "Car updated successfully", data: car });
  } catch (error) {
    // Handle client error
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a car
const deleteCar = async (req, res) => {
  try {
    // Find the car by ID and delete
    const car = await Car.findByIdAndDelete(req.params.id);
    // If car is not found, return error
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Return success message and deleted car data
    res.status(200).json({ message: "Car deleted successfully", data: car });
  } catch (error) {
    // Handle client error
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  listCars,
  getCar,
  createCar,
  updateCar,
  deleteCar,
};
