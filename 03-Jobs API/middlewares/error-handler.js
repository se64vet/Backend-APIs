const CustomAPIError = require('../errors/custom-api');
const {StatusCodes} = require('http-status-codes');

const ErrorHandlerMW = (err, req, res, next)=> {
    if(err instanceof CustomAPIError){
        res.status(err.statusCode).json({msg: err.message});
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err});
}

module.exports = ErrorHandlerMW;