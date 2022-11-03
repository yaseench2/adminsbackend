const Events = require('../Model/Event')
const scroll = require('../Model/Scroll')
const happening = require('../Model/Happening')
const news = require('../Model/New')
const alumnitext = require('../Model/AlumniScroll')
const jwt = require('jsonwebtoken')

exports.adminhome = async (req, res) => {
    let adminevents = await Events.find({ approval: true, active: 'on' })
    let adminupdate = await scroll.find()
    res.json({ adminevents, adminupdate })
}
exports.viewhappen = async (req, res) => {
    let adminhappen = await happening.find()
    res.json({ adminhappen })
}

exports.viewnews = async (req, res) => {
    let adminnews = await news.find()
    res.json({ adminnews })
}

exports.viewhod = async (req, res) => {
    const token = req.cookies.token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    let department = decoded.department
    let hodevents = await Events.find({ department: department, approval: false })
    res.json({ hodevents })
}
exports.viewalumni = async (req, res) => {
    let Alumniupdates = await alumnitext.find()
    res.json({ Alumniupdates })
}
