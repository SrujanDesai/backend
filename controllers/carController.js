const Car = require("../models/car");

const listCars = async (req, res) => {
  try {
    const cars = await Car.find({ available: true });
    res.status(200).json({ data: cars });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    res.status(200).json({ data: car });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const createCar = async (req, res) => {
  try {
    // Create new car instance
    const newCar = new Car(req.body);

    // Save the new car
    await newCar.save();
    res.status(201).json({ message: "Car created successfully", data: newCar });
  } catch (error) {
    console.error("Error in creating car:", error);
    res.status(400).json({ message: error.message });
  }
};

const updateCar = async (req, res) => {
  try {
    // Find the car by ID and update
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car updated successfully", data: car });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteCar = async (req, res) => {
  try {
    // Find the car by ID and delete
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.status(200).json({ message: "Car deleted successfully", data: car });
  } catch (error) {
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
