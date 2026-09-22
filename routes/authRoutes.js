const express = require("express");
const register = require("../controlers/authController")
// const bcrypt = require("bcrypt"); // hash pass

// const user = require("../database/tables/userList");  //marrim modelin user nga userList.js

const router = express.Router();

router.post("/register", register)

// routers.post('/register', async (req, res) => {
//     try {
//       const { username, lastname, email, password } = req.body;
//       if (!username || !lastname || !email || !password) {
//         return res.status(400).json({
//           message: "Të gjitha fushat janë të detyrueshme",
//         });
//       }
//       const exitstingUser = await user.findOne({
//         where: {
//           email: email,
//         },
//       });

//       if (exitstingUser) {
//         return res.status(409).json({
//           message: "This email is already registered",
//         });
//       }

//       const hashedPassword = await bcrypt.hash(password, 10);

//       const newUser = await anotherUser.create({
//         username,
//         lastname,
//         email,
//         password: hashedPassword,
//       });

//       res.status(201).json({
//         message: "User u regjistrua me sukses",
//           user: {
//           id: newUser.id,
//           username: newUser.username,
//           lastname: newUser.lastname,
//           email: newUser.email,
//         },
//       });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//           message: "Gabim në server",
//         });
//     }
// });

module.exports = router;

