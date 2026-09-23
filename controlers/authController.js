const express = require("express");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken")

const user = require("../database/tables/userList");

const register = async (req, res) => {
  const { username, lastname, email, password } = req.body;

  // check if use already exists
  const userExists = await user.findOne({
    where: {
      email: email,
    },
  });

  if (userExists) {
    const error = new Error("This email is already registered");
    error.statusCode = 409;
    throw error;
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const newUser = await user.create({
    username,
    lastname,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    message: "User is registered",
    user: {
      id: newUser.id,
      username: newUser.username,
      lastname: newUser.lastname,
      email: newUser.email,
    },
  });
};


//log in

const login = async (req, res) => {
    const { username, lastname, email, password } = req.body;

    //Check ifuser email exists in the table
    const userExists = await user.findOne({
        where: {
            email: email
        },
    });

     if (!userExists) {
       const error = new Error("Invalid email or password");
       error.statusCode = 401;
       throw error;
     }
    
    //Verify password
    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.statusCode = 401;
        throw error;
    }

    // Generate JWT Token

  const token = generateToken(userExists.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  });
    
     res.status(201).json({
       message: "User is logein",
       user: {
         id: userExists.id,
         email: userExists.email,
         },
     });
}


const logout = async (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        status: "success",
        message: "Logged out successfully",
    });
}

module.exports = { register, login, logout };

