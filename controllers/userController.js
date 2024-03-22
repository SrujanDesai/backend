const User = require("../models/user");
const Car = require("../models/car");

const getUserProfile = async (req, res) => {
  try {
    // Fetch user profile
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  try {
    // Find the user by Id and Update user profile
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User profile updated successfully", data: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const bookCar = async (req, res) => {
  try {
    const { carId, userId } = req.body;
    // Check if car ID is provided
    if (!carId) {
      return res.status(400).json({ message: "Car ID is required" });
    }

    // Fetch user
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User is not registered, please signup!" });
    }

    // Check if user has already booked the car
    if (user.bookedCars.includes(carId)) {
      return res
        .status(400)
        .json({ message: "Car is already booked by the user" });
    }

    // Fetch car
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Set car availability to false
    car.available = false;
    await car.save();

    // Add the booked car to user's bookedCars array
    user.bookedCars.push(carId);
    await user.save();

    res.status(200).json({ message: "Car booked successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const { carId, userId } = req.body;
    // Check if car ID is provided
    if (!carId) {
      return res.status(400).json({ message: "Car ID is required" });
    }

    // Fetch user
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User is not registered, please signup!" });
    }

    // Check if user has booked the car
    const index = user.bookedCars.indexOf(carId);
    if (index === -1) {
      return res.status(400).json({ message: "Car is not booked by the user" });
    }

    // Fetch car
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    // Set car availability to true
    car.available = true;
    await car.save();

    // Remove the car from user's bookedCars array
    user.bookedCars.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listUserBookings = async (req, res) => {
  try {
    const { userId } = req.body;
    // Fetch user's bookings
    const user = await User.findById(userId).populate("bookedCars"); // Populate booked cars details

    if (!user) {
      return res
        .status(404)
        .json({ message: "User is not registered, please signup!" });
    }

    res.status(200).json({ bookedCars: user.bookedCars });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  bookCar,
  cancelBooking,
  listUserBookings,
};
