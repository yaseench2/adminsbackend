const mongoose = require('mongoose')
const ScrollSchema = new mongoose.Schema({
    id: String,
    textname: String,
    Link: String,
})
module.exports = mongoose.model('Scroll', ScrollSchema)