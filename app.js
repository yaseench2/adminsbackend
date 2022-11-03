require('dotenv').config()
const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')
const connectDB = require('./config/mogo')
connectDB()
let port = process.env.PORT
app.set('view engine', 'ejs')
const cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.static('static'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));
const loginpage = require('./router/loginrouter')
const alumnirouter = require('./router/alumnirouter')
const eventrouter = require('./router/adminRouter')
const hodrouter = require('./router/hodrouter')
const errorrouter = require('./router/errorrouter')
const apirouter = require('./router/apirouter')
app.use('/api', apirouter)
app.use('/404', errorrouter)
app.use('/', eventrouter)
app.use('/login', loginpage)
app.use('/alumni', alumnirouter)
app.use('/hod', hodrouter)
app.get('*', function (req, res) {
    res.render('404error');
})
app.listen(port, () => { console.log("running in " + port) })