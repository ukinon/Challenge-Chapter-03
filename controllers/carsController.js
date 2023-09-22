const fs = require("fs");
const uuid = require("uuid");

const dataPath = `${__dirname}/../data/data.json`;

const cars = JSON.parse(fs.readFileSync(dataPath));

const checkData = (req, res, next, val) => {
  const car = cars.find((el) => el.id === val);

  if (!car) {
    res.status(404).json({
      status: "failed",
      requestTime: req.requestTime,
      message: `car with id ${val} not found`,
    });
  }
  next();
};

const checkBody = (req, res, next) => {
  if (!req.body.model || !req.body.manufacture) {
    res.status(404).json({
      status: "failed",
      message: `model and manufacture are required`,
    });
  }
  next();
};

const getAllCars = (req, res) => {
  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: cars,
  });
};

const getCarById = (req, res) => {
  const id = req.params.id;
  const car = cars.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    requestTime: req.requestTime,
    data: car,
  });
};

const addCar = (req, res) => {
  const id = uuid.v4();
  const data = Object.assign({ id: id }, req.body);

  cars.push(data);
  fs.writeFile(dataPath, JSON.stringify(cars), (err) => {
    res.status(201).json({
      status: "success",
      requestTime: req.requestTime,
      data: {
        car: data,
      },
    });
  });
};

const editCar = (req, res) => {
  const id = req.params.id;
  const carIndex = cars.findIndex((el) => el.id === id);

  cars[carIndex] = { ...cars[carIndex], ...req.body };

  fs.writeFile(dataPath, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      message: `car with id ${id} has been edited successfully`,
      data: {
        car: cars[carIndex],
      },
    });
  });
};

const deleteCar = (req, res) => {
  const id = req.params.id;
  const carIndex = cars.findIndex((el) => el.id === id);

  cars.splice(carIndex, 1);

  fs.writeFile(dataPath, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "success",
      requestTime: req.requestTime,
      message: `car with id ${id} has been deleted successfully`,
      data: null,
    });
  });
};

module.exports = {
  getAllCars,
  getCarById,
  addCar,
  editCar,
  deleteCar,
  checkData,
  checkBody,
};
