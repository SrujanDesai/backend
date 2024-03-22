const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    isEmail: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    isMobilePhone: true,
  },
  address: {
    type: String,
    required: true,
  },
  bookedCars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Car" }],
  role: {
    type: Number,
    default: 0,
  },
});

// Create a model from the schema
const User = new mongoose.model("User", userSchema);
module.exports = User;
