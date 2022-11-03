const Events = require('../Model/Event')
const cloudinary = require("cloudinary").v2;
const jwt = require('jsonwebtoken');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
exports.hodseeitems = async (req, res) => {
    const token = req.cookies.token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    let department = decoded.department
    let userName = decoded.username
    let hodevents = await Events.find({ department: department, approval: false })
    res.render('hodhome', { hodevents, department, userName })
}
exports.hoduploaditems = async (req, res) => {
    const token = req.cookies.token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    if (req.files) {
        if (req.files.picture) {
            const imagespic = req.files.picture
            cloudinary.uploader.upload(imagespic.tempFilePath, { folder: "shafiimages" }, async (err, result) => {
                let imageurl = result.url
                let publicid = result.public_id
                let { Eventname, Subname, active } = req.body
                let id = `${Date.now()}`
                if (!active) {
                    active = "OFF"
                }
                await Events.create({
                    id: id,
                    eventname: Eventname,
                    subname: Subname,
                    active: active,
                    imgurl: imageurl,
                    publicid: publicid,
                    approval: false,
                    department: decoded.department,
                    deplink: `https://sias.edu.in/academics/${decoded.department}/index.html`
                })
            })
        }
    }
    setTimeout(() => {
        res.redirect('/hod')
    }, 10000);

}
exports.hoddeleteEvents = async (req, res) => {
    let { id } = req.params
    let pid = await Events.findOne({ id: id })
    let publicid = pid.publicid
    await Events.deleteOne({ id: id })
    cloudinary.uploader.destroy(publicid)
    res.redirect('/hod')
}
exports.hodEditEvent = async (req, res) => {
    let { eventname } = req.params
    let EventEdit = await Events.findOne({ eventname: eventname })
    res.render('hodeditevents', { EventEdit })
}
exports.hodeditevents = async (req, res) => {
    const token = req.cookies.token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    let { Eventname, Subname, active, eid, publicid } = req.body
    let eventedit = await Events.findOne({ id: eid })
    eventedit.eventname = Eventname
    eventedit.subname = Subname
    if (active) {
        eventedit.active = active
    }
    else {
        eventedit.active = 'OFF'
    }
    await eventedit.save()
    if (req.files) {
        if (req.files.picture) {
            const imagespic = req.files.picture
            cloudinary.uploader.upload(imagespic.tempFilePath, { folder: "shafiimages" }, async (err, result) => {
                cloudinary.uploader.destroy(publicid)
                let publicid2 = result.public_id
                let imageurl = result.url
                eventedit.imgurl = imageurl
                eventedit.publicid = publicid2,
                    eventedit.approval = false,
                    eventedit.department = decoded.department,
                    eventedit.deplink = `https://sias.edu.in/academics/${decoded.department}/index.html`
                await eventedit.save()
            })
        }
    }
    setTimeout(() => {
        res.redirect('/hod')
    }, 8000);
}