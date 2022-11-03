const express = require('express')
const { seeitems, uploaditems, editevents, EditEvent, deleteEvents, addscrolltext, viewscrolltext, deletescroll, editscroll, updatescroll, happeningevents, happeninguploaditems, happeningdeleteEvents, happenEditEvent, happeneditevents, viewnews, uploadnews, newsdelete, editnews, newsupdate, approvallist, approvedlist, approvedelete } = require('../controller/admin')
const { isloggedIn, isAdmin } = require('../middleware/isloggedin')
const router = express.Router()

router
    .route('/')
    .get(isloggedIn, isAdmin, seeitems)
    .post(uploaditems)

router
    .route('/editevent/:eventname')
    .get(isloggedIn, isAdmin, EditEvent)
    .post(editevents)
router
    .route('/delete/:id')
    .get(deleteEvents)
router
    .route('/Scrolltext')
    .get(isloggedIn, isAdmin, viewscrolltext)
    .post(addscrolltext)
router
    .route('/scrolldelete/:id')
    .get(deletescroll)
router
    .route('/editscroll/:textname')
    .get(isloggedIn, isAdmin, editscroll)
    .post(updatescroll)
router
    .route('/Happening')
    .get(isloggedIn, isAdmin, happeningevents)
    .post(happeninguploaditems)
router
    .route('/happendelete/:id')
    .get(happeningdeleteEvents)
router
    .route('/happeneditevent/:eventname')
    .get(isloggedIn, isAdmin, happenEditEvent)
    .post(happeneditevents)
router
    .route('/news')
    .get(isloggedIn, isAdmin, viewnews)
    .post(uploadnews)
router
    .route('/newsdelete/:id')
    .get(newsdelete)
router
    .route('/editnews/:Heading')
    .get(isloggedIn, isAdmin, editnews)
    .post(newsupdate)
router
    .route('/approval')
    .get(isloggedIn, isAdmin, approvallist)

router
    .route('/approve/:id')
    .get(approvedlist)
router
    .route('/deleteapproval/:id')
    .get(approvedelete)

module.exports = router