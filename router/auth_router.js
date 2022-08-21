const express = require("express")
const router = express.Router()
const auth = require('../controller/auth_controller')
const Validation_login = require ('../validation/auth/login.validation')
const Validation_register = require('../validation/auth/register.validation')

router.post('/login',Validation_login.loginUser ,auth.login)
router.post('/register',Validation_register.registerUser ,auth.register)


module.exports= router