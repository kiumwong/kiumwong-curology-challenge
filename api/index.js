const config = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const OrderRoutes = require("./server/routes/OrderRoutes");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");

const basename = path.join(__dirname);
const newBase = basename.split('api');
console.log(newBase[0])

config.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));

const port = process.env.PORT || 5678;

app.use("/api/v1/magic", OrderRoutes);

app.get("*", (req, res) =>
  res.status(200).send({
    message: "Hello. Are you ready for some magic? =P",
  })
);

if (process.env.NODE_ENV == "production") {
  app.use('/', express.static("./build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(newBase[0], "/client/build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is running on PORT ${port}`);
});

module.exports = app;
