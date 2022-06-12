const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const leanerRoute = require("./app/api/routes/learner");
const couserRoute = require("./app/api/routes/course");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
app.set("secretKey", "hdjsakfhdjsk");
const userValidation = (req, res, next) => {
  jwt.verify(
    req.headers["x-access-token"],
    req.app.get("secretKey"),
    (err, decoded) => {
      if (err) {
        res.json({
          message: err,
        });
      }
      next();
    }
  );
};
app.use(logger("dev"));
app.use(bodyParser.json());
app.use("/learner", leanerRoute,userValidation);

app.use("/course", userValidation, couserRoute);

app.get("/", (req, res) => {
  res.json({
    APP: "JWT Based API Application",
    message: "Successfully Running the Application",
  });
});

const mongoURI =
"mongodb+srv://RakeshRk:Rakesh1234@cluster0.6k9driq.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Successfully Connected to the Database");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(process.env.PORT || 5008, () => {
  console.log("Successfully Running on the PORT: 5008");
});