const express = require("express");
const { loginUser } = require("../controllers/authController");
const { loginValidator } = require("../validators/loginValidator");
const { validate } = require("../middlewares/validate");
const { verifyToken, isAdmin, isUser } = require("../middlewares/authMiddleware");
const { getProfile } = require("../controllers/userController");

const router = express.Router();

router.post("/login", loginValidator, validate, loginUser);
router.get("/profile", verifyToken, isUser,getProfile);
router.get("/admin", verifyToken, isAdmin, (req, res) => res.json({ success: true, message: "Welcome, Admin!" }));

module.exports = router;
