// middlewares/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const createError = require('../utils/createError'); // make sure you have this

const verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies?.jwt;

    if (!token && req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) return next(createError(401, "No token provided"));

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return next(createError(401, "User not found"));

    req.user = user;
    next();
  } catch (err) {
    next(createError(401, "Token invalid or expired"));
  }
};

const isUser = (req, res, next) => {
  if (req.user?.role === "user" || req.user?.role === "admin") return next();
  next(createError(403, "User access only"));
};

const isAdmin = (req, res, next) => {
  if (req.user?.role === "admin") return next();
  next(createError(403, "Admin access only"));
};

module.exports = { verifyToken, isUser, isAdmin };
