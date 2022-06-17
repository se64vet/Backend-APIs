//auto import product.json as default database in mongo DB
require('dotenv').config();
const connect2DB = require('./Database/connect')
const Product = require('./models/products');

const productData = require('./products.json')

const start = async ()=> {
    try {
        await connect2DB(process.env.MONGO_URI)
        await Product.deleteMany();
        // create accept Array as a argument and import all items to DB
        await Product.create(productData)
        console.log('success');
        process.exit(0) // terminate the proccess after successfull task
    } catch (error) {
        console.log(error)
        process.exit(1) // terminate the proccess after throwing error
    }
}

start()