const express = require("express");
const morgan = require("morgan");
const carRouter = require("./routes/carRoutes");

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
