const User = require('../model/user');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');
const createError = require('../utils/createError'); // make sure you have this

// ===== Register User =====
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(createError(400, "Please enter all fields"));
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return next(createError(400, "User already exists"));
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    next(error); // sends error to centralized handler
  }
};

// ===== Login User =====
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(createError(400, "Please enter all fields"));
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(createError(400, "Invalid credentials"));
    }

    const token = generateToken(res, user._id); // sets cookie

    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// ===== Get Profile =====
const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return next(createError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { registerUser, loginUser, getProfile };
