const express = require("express");
const fs = require("fs");
const uuid = require("uuid");

const app = express();
const path = `${__dirname}/data/data.json`;
const port = process.env.port || 8000;
const cars = JSON.parse(fs.readFileSync(path));

//middleware
app.use(express.json());

//functions
const getAllCars = (req, res) => {
  res.status(200).json({
    status: "success",
    data: cars,
  });
};

const getCarById = (req, res) => {
  const id = req.params.id;
  const car = cars.find((el) => el.id === id);

  if (!car) {
    res.status(404).json({
      status: "failed",
      message: `car with id ${id} not found`,
    });
  }

  res.status(200).json({
    status: "success",
    data: car,
  });
};

const addCar = (req, res) => {
  const id = uuid.v4();
  const data = Object.assign({ id: id }, req.body);

  cars.push(data);
  fs.writeFile(path, JSON.stringify(cars), (err) => {
    res.status(201).json({
      status: "success",
      data: {
        car: data,
      },
    });
  });
};

const editCar = (req, res) => {
  const id = req.params.id;
  const carIndex = cars.findIndex((el) => el.id === id);

  if (carIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: `car with id ${id} not found`,
    });
  }

  cars[carIndex] = { ...cars[carIndex], ...req.body };

  fs.writeFile(path, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "success",
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

  if (carIndex === -1) {
    return res.status(404).json({
      status: "failed",
      message: `car with id ${id} not found`,
    });
  }

  cars.splice(carIndex, 1);

  fs.writeFile(path, JSON.stringify(cars), (err) => {
    res.status(200).json({
      status: "success",
      message: `car with id ${id} has been deleted successfully`,
      data: null,
    });
  });
};

//routing
const carRouter = express.Router();

app.get("/", (req, res) => {
  res.send("ping successfully");
});
carRouter.route("/").get(getAllCars).post(addCar);
carRouter.route("/:id").get(getCarById).put(editCar).delete(deleteCar);

app.use("/cars", carRouter);

//listen
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
