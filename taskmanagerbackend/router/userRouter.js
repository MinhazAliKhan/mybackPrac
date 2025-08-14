const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { registerValidator } = require('../Validators/userValidator');
const { validate } = require('../middlewares/validate');
const { loginValidator } = require('../Validators/loginValidator');

router.post('/register',registerValidator,validate, registerUser);
router.post('/login',loginValidator,validate, loginUser)
module.exports = router;