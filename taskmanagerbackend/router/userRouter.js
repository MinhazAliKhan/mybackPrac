const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/userController');
const { registerValidator } = require('../Validators/userValidator');
const { validate } = require('../middlewares/validate');

router.post('/register',registerValidator,validate, registerUser);

module.exports = router;