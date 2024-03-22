const mongoose = require("mongoose");

// Define the Car schema
const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  pricePerDay: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// Create a model from the schema
const Car = new mongoose.model("Car", carSchema);
module.exports = Car;
