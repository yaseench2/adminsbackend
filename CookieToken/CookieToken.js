const cookieToken = async (user, res) => {
    const token1 = await user.getjwtToken()
    let goto
    if (user.usertype == "admin") {
        goto = '/'
    } else if (user.usertype == "Hod") {
        goto = '/hod'
    } else if (user.usertype == "Alumni") {
        goto = '/alumni'
    } else {
        goto = '/login'
    }
    const options = {
        expires: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000),
        httpOnly: true
    }
    return res.cookie('token', token1, options).redirect(`${goto}`)
}

module.exports = cookieToken