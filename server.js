const express = require("express");
const mysql2 = require("mysql2");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const port = 3000;
const sequelize = require("./database/connection");
const router = require("./routes/movie.js")
const routers = require("./routes/authRoutes.js")

// importon relacionet
require("./database/relations");

sequelize
  .sync()
  .then(() => {
    console.log("Tabelat u krijuan.");
  })
  .catch((err) => {
    console.log(err);
  });

//Body parsing middleware // perkthen te dhenat qe vijn nga useri ne JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//API Routers create port to use routes "define the name and pass the router"
app.use("/movies", router);
app.use("/auth", routers);


// app.use(cors(
//     {
//         origin: [""],
//         methods: ["POST, GET"],
//         credentials: true
//     }
// ));

// app.use(express.json());
// app.use(
//   session({
//     secret: "ndrysho-kete-sekret-te-gjate",
//     resave: false,
//     saveUninitialized: false,
//     cookie: { httpOnly: true, maxAge: 1000 * 60 * 60 }, // 1 orë
//   }),
// );

app.get('/', (req, res) => {
    res.json({message: "Hello "})
})







app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);

});
//Kontrollojm nese useri ekziston