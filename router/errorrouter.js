const express = require('express')
const { j404 } = require('../controller/error')
const router = express.Router()
router
    .route('/')
    .get(j404)

module.exports = router