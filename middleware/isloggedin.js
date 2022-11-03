const jwt = require('jsonwebtoken')

exports.isloggedIn = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.redirect('/login')
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
}
exports.isAdmin = async (req, res, next) => {
    const token = req.cookies.token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.usertype == 'admin') {
        next()
    } else {
        res.redirect('/404')
    }
}
exports.isAlumini = async (req, res, next) => {
    const token = req.cookies.token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.usertype == 'Alumni') {
        next()
    } else {
        res.redirect('/404')
    }
}
exports.isHod = async (req, res, next) => {
    const token = req.cookies.token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.usertype == 'Hod') {
        next()
    } else {
        res.redirect('/404')
    }
}