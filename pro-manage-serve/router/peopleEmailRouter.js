const express = require('express');
const router= express.Router();
const reqValidation = require('../utils/reqValidation');
const scheamValidation = require('../middleware/reqValidationMiddleware')
const {getPeopleMail,createPeopleMail} = require('../controller/emailController');
const {isAuth} = require('../middleware/authMiddleware');

// user registration
router.get("/getEmails",isAuth, getPeopleMail);
router.post("/createEmails",scheamValidation.request_validation(reqValidation.createPeopleMail),createPeopleMail);





module.exports = router