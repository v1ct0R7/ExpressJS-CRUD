require("dotenv").config();

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = 3000;

const sequelize = require("./database/connection");

const movieRouter = require("./routes/movie.js");
const authRouter = require("./routes/authRoutes.js");

// Importon relacionet
require("./database/relations");

// Kontrollon/krijon tabelat
sequelize
  .sync()
  .then(() => {
    console.log("Tabelat u krijuan.");
  })
  .catch((err) => {
    console.log(err);
  });

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie middleware
app.use(cookieParser());

// API Routes
app.use("/movies", movieRouter);
app.use("/auth", authRouter);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Hello",
  });
});

// Start server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
