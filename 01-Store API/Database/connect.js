const mongoose = require('mongoose')

const connect2DB = (url)=> {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
}

module.exports = connect2DB;