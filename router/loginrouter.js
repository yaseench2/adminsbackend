const express = require('express')
const { loginpage, postlogin, registerpage, register, logout } = require('../controller/login')

const router = express.Router()

router
    .route('/')
    .get(loginpage)
    .post(postlogin)
router
    .route('/register')
    .get(registerpage)
    .post(register)
router
    .route('/logout')
    .get(logout)

module.exports = router