const express = require("express");
const morgan = require("morgan");
const carRouter = require("./routes/carRoutes");

const app = express();

//middlewares
app.use((req, res, next) => {
  console.log("Request Sent:");
  next();
});
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.requestTime);
  next();
});

app.use(express.json());
app.use(morgan("dev"));
app.use("/cars", carRouter);

//ping test route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    requestTime: req.requestTime,
    message: "ping successfully",
  });
});

module.exports = app;
