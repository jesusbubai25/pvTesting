
const { body } = require("express-validator")

exports.userRegistrationValidation = [

    body("firstName")
        .exists({ checkFalsy: true }).withMessage("firstName is required")
        .isString().withMessage("firstName should be a string")
        .isLength({ min: 3, max: 30 }).withMessage("firstName is too short"),

    body("lastName")
        .exists({ checkFalsy: true }).withMessage("lastName is required")
        .isString().withMessage("lastName should be a string")
        .isLength({ min: 3, max: 30 }).withMessage("lastName is too short"),

    body("email")
        .exists({ checkFalsy: true }).withMessage("email is required")
        .isString().withMessage("email should be a string")
        .isEmail().withMessage("Enter a valid email"),

    body("phoneNumber")
        .exists({ checkFalsy: true }).withMessage("phoneNumber is required")
        .isNumeric().withMessage("Phone number should be a number")
        .isLength({ min: 10, max: 10 }).withMessage("Enter a 10 digit phone number"),

    body("userLevel")
        .exists({ checkFalsy: true }).withMessage("userLevel is required")
        .isNumeric().withMessage("userLevel should be a number")
        .isInt({ min: 1, max: 3 }).withMessage("userLevel should be range between 1 to 3")
]

exports.userLoginValidation = [

    body("userName")
    .exists({ checkFalsy: true }).withMessage("userName is required")
    .isString().withMessage("userName should be a string")
    .isEmail().withMessage("Enter a valid userName"),

    body("password")
        .exists({ checkFalsy: true }).withMessage("password is required")
        .isString().withMessage("password must be a string")
        .isLength({ min: 6, max: 18 }).withMessage("password length should range between 6 to 18")
        .isStrongPassword().withMessage("Enter a strong password")
]







