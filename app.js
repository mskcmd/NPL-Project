const express = require("express");
const mongoDB = require('./config/mongoAuth')
mongoDB.mongoDB()
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Connect to MongoDB

// Routes
const textRoutes = require("./controllers/textController");
app.use("/texts", textRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
