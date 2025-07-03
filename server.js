const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/mongoose");

//env config
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongodb connection
connectDB();

//rest object
const app = express();

//middlewares
// server.js
app.use(
  cors({
    origin:
      "https://vercel.com/biyush803s-projects/my-blog-app-frontend/JCPossL8xsvZ1PaoFx8PdPrQ7Lvi",
  })
);

app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

//port
const PORT = process.env.PORT || 9005;

app.get("/", (req, res) => {
  res.send("My Blog API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`.bgBlue.white);
  console.log("Press CTRL + C to disconnect server...");
});
