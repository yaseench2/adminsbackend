const mongoose = require('mongoose')
const HappeningSchema = new mongoose.Schema({
    id: String,
    eventname: String,
    subname: String,
    imgurl: String,
    active: String,
    publicid: String,
})

module.exports = mongoose.model('Happening', HappeningSchema)