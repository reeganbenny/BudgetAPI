require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");

const app = express();
const MONGODB_URL = process.env.MONGODB_URL;
console.log(MONGODB_URL);
app.use(bodyParser.json());
app.use("/user", userRoutes);

mongoose.connect(MONGODB_URL, () => console.log("Connected to DB!"));
app.listen(3000);
