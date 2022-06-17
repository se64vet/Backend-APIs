const user = require('../models/user');
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, UnauthError} = require('../errors')

const register = async(req, res)=> {
    // create new User
    const newUser = await user.create({...req.body});
    // hashing password logics is saved on user model folder
    // to optimize the runtime and lenght of the main code
    const token = newUser.createJWT();
    res.status(StatusCodes.CREATED).json({username: newUser.name, token});
}

const login = async(req, res)=> {
    const {email, password} = req.body;

    //check if email & password fields is blank 
    if(!email || !password){
        throw new BadRequestError('please provide email & password to login.');
    }

    //check if user exist in database
    const logUser = await user.findOne({email})
    if(!logUser){
        throw new UnauthError('user email did not exist in our system, please register.');
    }

    //check if password is corrected
    const isPasswordMatch = await logUser.checkPassword(password);
    if(!isPasswordMatch){
        throw new UnauthError('wrong password, please try again.')
    }

    //if pass, create token and send back to user
    const token = logUser.createJWT();
    res.status(StatusCodes.OK).json({user: {name: logUser.name,}, token})
}

module.exports = {
    register,
    login,
}