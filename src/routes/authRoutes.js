const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const constants = require("../utils/constansts");
const validate = require("../middlewares/validate");
const { body } = require("express-validator");


router.post("/user/signUp",
    validate([
        body("email").
            exists().
            isEmail().
            withMessage(constants.messages.invalid_email)
    ]),
    authController.createUser);

router.post("/user/signIn",
    validate([
        body("email").
            exists().
            isEmail().
            withMessage(constants.messages.invalid_email)
    ]),
    authController.loginUser);

router.delete("/user/remove",
    validate([
        body("email").
            exists().
            isEmail().
            withMessage(constants.messages.invalid_email)
    ]),
    authController.deleteUser);

router.patch("/user/change/password",
    validate([
        body("email").
            exists().
            isEmail().
            withMessage(constants.messages.invalid_email)
    ]),
    authController.changePassword);

module.exports = router;