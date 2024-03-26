const express = require("express");
const app = express();
const mongoose = require("mongoose");
const adminRouter = require("./router/adminRouter");
const userRouter = require("./router/userRouter");
const carRouter = require("./router/carRouter");
const authRouter = require("./router/authRouter");

// Initialize Express application
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Route handling for different functionalities
app.use("/admin", adminRouter); // Routes for admin functionalities
app.use("/user", userRouter);   // Routes for user functionalities
app.use("/car", carRouter);     // Routes for car functionalities
app.use(authRouter);            // Routes for authentication

// Connect to MongoDB database
mongoose
  .connect(
    "mongodb+srv://srujan:mongodb2512@cluster0.h4itok2.mongodb.net/car-rental"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Start the server
app.listen(8080, () => {
  console.log("Server started on port 8080");
});
