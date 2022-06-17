const errorHandlerMiddleware = async (err, req, res, next)=> {
    
    throw Error(err)
}

module.exports = errorHandlerMiddleware