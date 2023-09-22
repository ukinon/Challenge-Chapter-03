const express = require("express");
const carRouter = require("./routes/carRoutes");
const morgan = require("morgan");

const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use("/cars", carRouter);

//ping test route
app.get("/", (req, res) => {
  res.send("ping successfully");
});

module.exports = app;
