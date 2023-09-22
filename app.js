const express = require("express");
const carRouter = require("./routes/carRoutes");
const morgan = require("morgan");

const app = express();
//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use("/cars", carRouter);

app.route("/").get((req, res) => {
  res.send("ping successfully");
});

module.exports = app;
