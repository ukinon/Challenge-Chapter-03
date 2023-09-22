const express = require("express");
const carsController = require("../controllers/carsController");

const carRouter = express.Router();

carRouter.param("id", carsController.checkData);

carRouter
  .route("/")
  .get(carsController.getAllCars)
  .post(carsController.checkBody, carsController.addCar);
carRouter
  .route("/:id")
  .get(carsController.getCarById)
  .put(carsController.editCar)
  .delete(carsController.deleteCar);

module.exports = carRouter;
