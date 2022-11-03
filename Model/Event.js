const mongoose = require('mongoose')
const EventSchema = new mongoose.Schema({
    id: String,
    eventname: String,
    subname: String,
    imgurl: String,
    active: String,
    publicid: String,
    approval: Boolean,
    department: String,
    deplink: String
})

module.exports = mongoose.model('Event', EventSchema)