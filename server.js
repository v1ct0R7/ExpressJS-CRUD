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
const user = require("./database/tables/userList");


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
    res.send('Hello')
})








app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);

});
//Kontrollojm nese useri ekziston