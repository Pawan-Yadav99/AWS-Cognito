const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');


router.get("/getUser", authController.getUser);


module.exports = router;