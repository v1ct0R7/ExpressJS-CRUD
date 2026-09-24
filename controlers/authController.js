const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const User = require("../database/tables/userList");

const register = async (req, res) => {
  try {
    const { username, lastname, email, password } = req.body;

    if (!username || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      return res
        .status(409)
        .json({ message: "This email is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      lastname,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User is registered",
      user: {
        id: newUser.id,
        username: newUser.username,
        lastname: newUser.lastname,
        email: newUser.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const userExists = await User.findOne({ where: { email } });

    if (!userExists) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(userExists.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User is logged in",
      user: {
        id: userExists.id,
        email: userExists.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message || "Server error" });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  return res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

module.exports = { register, login, logout };
