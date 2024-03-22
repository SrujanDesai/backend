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

router.get("/", listCars);
router.get("/:id", getCar);
router.post("/add", requireSignIn, isAdmin, createCar);
router.put("/edit/:id", requireSignIn, isAdmin, updateCar);
router.delete("/delete/:id", requireSignIn, isAdmin, deleteCar);

module.exports = router;
