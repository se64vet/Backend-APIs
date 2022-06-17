const CustomAPIError =  require('./custom-api');
const UnauthError = require('./unauth');
const NotFoundError = require('./not-found');
const BadRequestError = require('./bad-request')

module.exports = {
    CustomAPIError,
    UnauthError,
    NotFoundError,
    BadRequestError,
}