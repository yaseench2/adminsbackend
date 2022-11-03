const express = require('express')
const { adminhome, viewhod, viewalumni, viewhappen, viewnews } = require('../controller/appapi')
const router = express.Router()

router
    .route('/')
    .get(adminhome)
router
    .route('/Hod')
    .get(viewhod)
router
    .route('/Alumni')
    .get(viewalumni)

router
    .route('/happen')
    .get(viewhappen)
router
    .route('/news')
    .get(viewnews)

module.exports = router