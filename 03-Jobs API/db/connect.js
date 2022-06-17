
const mongoose = require('mongoose')


const connectDB = async(url)=> {
        try {
            await mongoose.connect(url,{
                useNewUrlParser: true,
                useUnifiedTopology:true,
            });
            console.log('DB connected !')
        } catch (error) {
            console.log('Fail to connect to your DB', error)
        }
}


module.exports = connectDB;