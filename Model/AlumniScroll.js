const mongoose = require('mongoose')
const AlumniScrollSchema = new mongoose.Schema({
    id: String,
    textname: String,
    Link: String,
    username: String
})
module.exports = mongoose.model('AlumniScroll', AlumniScrollSchema)