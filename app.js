const express = require("express");
const app = express();
const mongoose = require("mongoose");
const adminRouter = require("./router/adminRouter");
const userRouter = require("./router/userRouter");
const carRouter = require("./router/carRouter");
const authRouter = require("./router/authRouter");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);
app.use("/car", carRouter);
app.use(authRouter);

mongoose
  .connect(
    "mongodb+srv://srujan:mongodb2512@cluster0.h4itok2.mongodb.net/car-rental"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
