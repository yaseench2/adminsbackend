const alumnitext = require('../Model/AlumniScroll')

exports.alumnihome = async (req, res) => {
    let token = req.user.username
    let data = await alumnitext.find({ username: token })
    res.render('alumnihome', { data, token })
}
exports.uploadalumniscroll = async (req, res) => {
    let { text1, link, username } = req.body
    let id = `${Date.now()}`
    await alumnitext.create({
        id: id,
        textname: text1,
        Link: link,
        username: username
    })
    res.redirect('/alumni')
}
exports.deletealumniscroll = async (req, res) => {
    let { id } = req.params
    await alumnitext.deleteOne({ id: id })
    res.redirect('/alumni')
}
exports.alumnieditscroll = async (req, res) => {
    let token = req.user.username
    let { textname } = req.params
    let edit2 = await alumnitext.findOne({ textname: textname })
    res.render('alumniUpdatesedit', { edit2, token })
}
exports.alumniupdatescroll = async (req, res) => {
    let { textname, Link, eid } = req.body
    let dataedit = await alumnitext.findOne({ id: eid })
    dataedit.textname = textname
    dataedit.Link = Link
    await dataedit.save()
    res.redirect('/alumni')
}