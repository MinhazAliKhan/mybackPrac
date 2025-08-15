const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile } = require('../controllers/userController');
const { registerValidator } = require('../Validators/userValidator');
const { validate } = require('../middlewares/validate');

const { verifyToken, isUser, isAdmin } = require('../middlewares/authMiddleware');
const { loginValidator } = require('../validators/loginValidator');

router.post('/register',registerValidator,validate, registerUser);
router.post('/login',loginValidator,validate, loginUser);

router.get("/profile", verifyToken, isUser,getProfile);
router.get("/admin", verifyToken, isAdmin, (req, res) => res.json({ success: true, message: "Welcome, Admin!" }));
module.exports = router;