const {body}=require('express-validator');

 const registerValidator=[
    body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
    body('email')
    .trim() 
    .notEmpty().withMessage('email required') 
    .isEmail().withMessage('Invalid email formate'),
    body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
]

module.exports={registerValidator}