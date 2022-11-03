const Events = require('../Model/Event')
const scroll = require('../Model/Scroll')
const happening = require('../Model/Happening')
const news = require('../Model/New')

const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

exports.seeitems = async (req, res) => {
    let events = await Events.find({ approval: true })
    events.reverse()
    res.render('events', { events })
}
exports.uploaditems = async (req, res) => {
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
                    approval: true
                })
            })
        }
    }
    setTimeout(() => {
        res.redirect('/')
    }, 10000);

}
exports.EditEvent = async (req, res) => {
    let { eventname } = req.params
    let EventEdit = await Events.findOne({ eventname: eventname })
    if (EventEdit) {
        res.render('eventsUpdate', { EventEdit })
    } else {
        res.redirect('/404')
    }


}
exports.editevents = async (req, res) => {
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
                eventedit.publicid = publicid2
                await eventedit.save()
            })
        }
    }
    setTimeout(() => {
        res.redirect('/')
    }, 8000);
}
exports.deleteEvents = async (req, res) => {
    let { id } = req.params
    let pid = await Events.findOne({ id: id })
    let publicid = pid.publicid
    await Events.deleteOne({ id: id })
    cloudinary.uploader.destroy(publicid)
    res.redirect('/')
}

// admin updates
exports.viewscrolltext = async (req, res) => {
    let data = await scroll.find()
    data.reverse()
    res.render('adminUpdates', { data })
}
exports.addscrolltext = async (req, res) => {
    let { text1, link } = req.body
    let id = `${Date.now()}`
    await scroll.create({
        id: id,
        textname: text1,
        Link: link
    })
    res.redirect('/Scrolltext')
}
exports.deletescroll = async (req, res) => {
    let { id } = req.params
    await scroll.deleteOne({ id: id })
    res.redirect('/Scrolltext')
}
exports.editscroll = async (req, res) => {
    let { textname } = req.params
    let edit2 = await scroll.findOne({ textname: textname })
    res.render('admineditupdates', { edit2 })
}
exports.updatescroll = async (req, res) => {
    let { textname, Link, eid } = req.body
    let dataedit = await scroll.findOne({ id: eid })
    dataedit.textname = textname
    dataedit.Link = Link
    await dataedit.save()
    res.redirect('/Scrolltext')
}

// admin happening
exports.happeningevents = async (req, res) => {
    let happen = await happening.find()
    happen.reverse()
    res.render('happen', { happen })
}
exports.happeninguploaditems = async (req, res) => {
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
                await happening.create({
                    id: id,
                    eventname: Eventname,
                    subname: Subname,
                    active: active,
                    imgurl: imageurl,
                    publicid: publicid,
                })
            })
        }
    }
    setTimeout(() => {
        res.redirect('/Happening')
    }, 10000);

}
exports.happenEditEvent = async (req, res) => {
    let { eventname } = req.params
    let EventEdit = await happening.findOne({ eventname: eventname })
    res.render('happeningedits', { EventEdit })
}
exports.happeningdeleteEvents = async (req, res) => {
    let { id } = req.params
    let pid = await happening.findOne({ id: id })
    let publicid = pid.publicid
    await happening.deleteOne({ id: id })
    cloudinary.uploader.destroy(publicid)
    res.redirect('/Happening')
}
exports.happeneditevents = async (req, res) => {
    let { Eventname, Subname, active, eid, publicid } = req.body
    let eventedit = await happening.findOne({ id: eid })
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
                eventedit.publicid = publicid2
                await eventedit.save()
            })
        }
    }
    setTimeout(() => {
        res.redirect('/Happening')
    }, 8000);
}

// admin news
exports.viewnews = async (req, res) => {
    let viewnew = await news.find()
    viewnew.reverse()
    res.render('news', { viewnew })
}
exports.uploadnews = async (req, res) => {
    if (req.files) {
        if (req.files.picture) {
            const imagespic = req.files.picture
            cloudinary.uploader.upload(imagespic.tempFilePath, { folder: "shafiimages" }, async (err, result) => {
                let imageurl = result.url
                let publicid = result.public_id
                let { Heading, Subhead } = req.body
                let id = `${Date.now()}`
                await news.create({
                    id: id,
                    Heading: Heading,
                    subHead: Subhead,
                    imgurl: imageurl,
                    publicid: publicid,
                })
            })
        }
    }
    setTimeout(() => {
        res.redirect('/news')
    }, 10000);

}
exports.newsdelete = async (req, res) => {
    let { id } = req.params
    let pid = await news.findOne({ id: id })
    let publicid = pid.publicid
    await news.deleteOne({ id: id })
    cloudinary.uploader.destroy(publicid)
    res.redirect('/news')
}
exports.editnews = async (req, res) => {
    let { Heading } = req.params
    let newsEdit = await news.findOne({ Heading: Heading })
    res.render('editnews', { newsEdit })

}
exports.newsupdate = async (req, res) => {
    let { Heading, subHead, eid, publicid } = req.body
    let eventedit = await news.findOne({ id: eid })
    eventedit.Heading = Heading
    eventedit.subHead = subHead
    await eventedit.save()
    if (req.files) {
        if (req.files.picture) {
            const imagespic = req.files.picture
            cloudinary.uploader.upload(imagespic.tempFilePath, { folder: "shafiimages" }, async (err, result) => {
                cloudinary.uploader.destroy(publicid)
                let publicid2 = result.public_id
                let imageurl = result.url
                eventedit.imgurl = imageurl
                eventedit.publicid = publicid2
                await eventedit.save()
            })
        }
    }
    setTimeout(() => {
        res.redirect('/news')
    }, 8000);
}

// admin approve list
exports.approvallist = async (req, res) => {
    let data = await Events.find({ approval: false })
    res.render('Approvelist', { data })
}
exports.approvedlist = async (req, res) => {
    let { id } = req.params
    let approve = await Events.findOne({ id: id })
    approve.approval = "true"
    await approve.save()
    res.redirect('/approval')
}
exports.approvedelete = async (req, res) => {
    let { id } = req.params
    await Events.deleteOne({ id: id })
    res.redirect('/approval')

}