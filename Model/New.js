const mongoose = require('mongoose')
const NewSchema = new mongoose.Schema({
    id: String,
    Heading: String,
    subHead: String,
    imgurl: String,
    publicid: String,
})

module.exports = mongoose.model('New', NewSchema)