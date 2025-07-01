// app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoose");

// env config
dotenv.config();

// connect DB
connectDB();

// create app
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/blog", require("./routes/blogRoutes"));

module.exports = app;
