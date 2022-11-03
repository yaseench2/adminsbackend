const express = require('express')
const { alumnihome, uploadalumniscroll, deletealumniscroll, alumnieditscroll, alumniupdatescroll } = require('../controller/alumni')
const { isloggedIn, isAlumini } = require('../middleware/isloggedin')
const router = express.Router()

router
    .route('/')
    .get(isloggedIn, isAlumini, alumnihome)
    .post(uploadalumniscroll)
router
    .route('/alumniscrolldelete/:id')
    .get(deletealumniscroll)
router
    .route('/alumnieditscroll/:textname')
    .get(isloggedIn, isAlumini, alumnieditscroll)
    .post(alumniupdatescroll)

module.exports = router