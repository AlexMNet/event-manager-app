const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const secret = 'thisisareallypowerfulsecret';
const expiry = 3600;
const saltRounds = 10;

exports.registerNewUser = async (req, res) => {
  try {
    //Check if user exists
    const existingUser = await User.findOne({ username: req.body.username });
    if (!existingUser) {
      //Hash password
      const hashedPass = await bcrypt.hash(req.body.password, saltRounds);

      //Create new user with hashed password
      const newUser = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        email: req.body.email,
        role: req.body.role,
        password: hashedPass,
      });

      //Create Token
      const token = await jwt.sign(
        {
          id: newUser._id,
          username: newUser.username,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          role: newUser.role,
        },
        secret,
        { expiresIn: expiry }
      );
      //Send token to user
      res.status(200).json({
        status: 'success',
        message: 'Registration Successful!',
        token,
      });
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'User with that user name already exists!',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    //Check if user exists
    const foundUser = await User.findOne({ username: req.body.username });

    if (foundUser) {
      //Compare user password against hashed password in DB
      const passwordMatch = await bcrypt.compare(
        req.body.password,
        foundUser.password
      );

      //If password AND email match send create and send token to user
      if (passwordMatch && req.body.email === foundUser.email) {
        const token = jwt.sign(
          {
            id: foundUser.id,
            username: foundUser.username,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
          },
          secret,
          { expiresIn: expiry }
        );

        res.status(200).json({
          status: 'success',
          message: 'Login successful',
          token,
        });
      } else {
        res.status(401).json({
          status: 'fail',
          message: 'email or password is incorrect',
        });
      }
    } else {
      res.status(400).json({
        status: 'fail',
        message: 'Username not found!',
      });
    }
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};
