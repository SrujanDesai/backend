const User = require("../models/user");

// Controller for retrieving all registered users and their count (for admin)
const getAllUsers = async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find({});

    // If no users are found, return an error
    if (!users || users.length === 0) {
      return res.status(400).json({
        error: "No users",
      });
    }

    // Filter customers from all users
    const customers = users.filter((user) => user.role === 0);
    // Count the number of customers
    const userCount = customers.length;
    // Return users and their count
    res.status(200).json({ users: customers, numberOfUsers: userCount });
  } catch (error) {
    // Handle server error
    return res.status(500).json({ error: error.message });
  }
};

// Controller for retrieving all booked cars and count of booked cars (for admin)
const getAllBookedCars = async (req, res) => {
  try {
    // Find users who have booked cars and populate their booked cars
    const users = await User.find({
      bookedCars: { $exists: true, $ne: [] },
    }).populate("bookedCars");

    // If no users with booked cars are found, return an error
    if (!users || users.length === 0) {
      return res.status(400).json({
        error: "No any registered users!",
      });
    }

    let allBookedCars = [];
    let bookedCarsCount = 0;

    // Aggregate booked cars from all users
    users.forEach((user) => {
      if (user.bookedCars && user.bookedCars.length > 0) {
        allBookedCars.push(...user.bookedCars);
        bookedCarsCount += user.bookedCars.length;
      }
    });

    // Return all booked cars, count of booked cars, and users with booked cars
    return res.status(200).json({
      allBookedCars: allBookedCars,
      bookedCarsCount: bookedCarsCount,
      usersWithBookedCars: users,
    });
  } catch (error) {
    // Handle server error
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getAllBookedCars,
};
