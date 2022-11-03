const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    id: String,
    username: String,
    password: String,
    usertype: String,
    department: String
})
UserSchema.pre('save', async function (next) {
    if (!(this.isModified('password'))) {
        return next()
    }
    this.password = await bcrypt.hash(this.password, 5)
})
UserSchema.methods.isValidatePassword = async function (usersendPassword) {
    return await bcrypt.compare(usersendPassword, this.password)
}
UserSchema.methods.getjwtToken = async function () {
    return await jwt.sign(
        {
            username: this.username,
            usertype: this.usertype,
            department: this.department
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY }
    )
}
module.exports = mongoose.model('User', UserSchema)