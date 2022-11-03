const express = require('express')
const { hodseeitems, hoduploaditems, hoddeleteEvents, hodEditEvent, hodeditevents } = require('../controller/hodcontroll')
const { isloggedIn, isHod } = require('../middleware/isloggedin')
const router = express.Router()

router
    .route('/')
    .get(isloggedIn, isHod, hodseeitems)
    .post(hoduploaditems)
router
    .route('/hoddelete/:id')
    .get(hoddeleteEvents)
router
    .route('/hodeditevent/:eventname')
    .get(isloggedIn, isHod, hodEditEvent)
    .post(hodeditevents)

module.exports = router