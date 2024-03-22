const User = require("../models/user");

// Get all the registered users and their count
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});

    if (!users || users.length === 0) {
      return res.status(400).json({
        error: "No users",
      });
    }

    const customers = users.filter((user) => user.role === 0);
    const userCount = customers.length;
    res.status(200).json({ users: customers, numberOfUsers: userCount });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all booked cars from all users and count of booked cars
const getAllBookedCars = async (req, res) => {
  try {
    const users = await User.find({
      bookedCars: { $exists: true, $ne: [] },
    }).populate("bookedCars");

    if (!users || users.length === 0) {
      return res.status(400).json({
        error: "No any registered users!",
      });
    }

    let allBookedCars = [];
    let bookedCarsCount = 0;

    users.forEach((user) => {
      if (user.bookedCars && user.bookedCars.length > 0) {
        allBookedCars.push(...user.bookedCars);
        bookedCarsCount += user.bookedCars.length;
      }
    });

    return res.status(200).json({
      allBookedCars: allBookedCars,
      bookedCarsCount: bookedCarsCount,
      usersWithBookedCars: users,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getAllBookedCars,
};
