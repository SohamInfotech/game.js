const jwt = require('jsonwebtoken')
const userModel = require('../model/user')

exports.tokenSecure = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        if (!token) throw new Error('Attach token')
        const tokenVerify = jwt.verify(token, 'verify')
        const userVerify = await userModel.findById(tokenVerify.id)
        if (!userVerify) throw new Error('User not found')
        next()
    } catch (error) {
        res.status(404).json({
            status: 'Fail',
            Message: error.message
        })
    }
}