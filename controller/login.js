const User = require('../Model/User')
const cookieToken = require('../CookieToken/CookieToken')
exports.loginpage = async (req, res) => {
    res.render('login')
}
exports.postlogin = async (req, res) => {
    const { username, password } = req.body
    let user = await User.findOne({ username: username })
    if (!user) {
        return res.redirect('/login')
    }
    let ispassword = await user.isValidatePassword(password)
    if (!ispassword) {
        return res.redirect('/login')
    }
    cookieToken(user, res)
}
exports.registerpage = async (req, res) => {
    res.render('register')
}
exports.register = async (req, res) => {
    let { username, password, usertype, department } = req.body
    let id = `${Date.now()}`
    await User.create({
        id: id,
        username: username,
        password: password,
        usertype: usertype,
        department: department
    })
    res.redirect('/login')
}
exports.logout = async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
    res.status(200).redirect('/login')
}