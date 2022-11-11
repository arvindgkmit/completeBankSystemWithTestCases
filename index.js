const express = require("express");
const db = require("./app/models/db");
const userRoutes = require("./app/routes/userRoute");
const accountRoutes = require("./app/routes/accountRoutes");
const transactionRoutes = require("./app/routes/transactionRoutes");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());

// check database connection
try {
  db.sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

//   available routes
app.use("/api", userRoutes);
app.use("/api", accountRoutes);
app.use("/api", transactionRoutes);

module.exports = app;
