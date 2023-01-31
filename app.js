const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

//middleware
app.use(bodyParser.json());
app.use(morgan("combined", { stream: accessLogStream }));

require("dotenv/config");

const api = process.env.API_URL;

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: "hair dresser",
    image: "some_url",
  };
  res.send(product);
});

app.post(`${api}/products`, (req, res) => {
  const newProduct = req.body;
  console.log(newProduct);
  res.send(newProduct);
});

app.listen(3000, () => {
  console.log(api);
  console.log(`Server is Running now on http://localhost:3000${api} port`);
});
