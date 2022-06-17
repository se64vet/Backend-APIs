const user = require('../models/user');
const jwt = require('jsonwebtoken');
const {UnauthError} = require('../errors')

const auth = async(req, res, next)=> {
    //check header
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthError('Authenication invalid')
    }

    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT)

        //attach user to job routes
        req.user = {userId: payload.userId, name: payload.name}

        next()
    } catch (error) {
        throw new UnauthError('Authentication invalid')
    }
}

module.exports = auth;