
require('dotenv').config()

//async errors
require('express-async-errors')

const connect2DB = require('./Database/connect')
const express =  require('express')
const app = express()
const productsRouter = require("./routes/products")

const notFoundMiddleware =  require('./middleware/not-found')
const errorMiddleware = require('./middleware/error-handler')


//middleware
app.use(express.json())


//routes
app.get('/', (req, res)=> {
    res.send("<h1>hello world</h1><br><a href='/api/v1/products'>Products page</a>")
})

app.use('/api/v1/products', productsRouter)
// products routes

//error handling middleware
    //not-found will handling all coming routes not match the exac mount path
app.use(notFoundMiddleware)
    //err-handling is declare as errorHandlingMiddleware
    //that only execute when detect err
app.use(errorMiddleware)





const port = process.env.PORT || 5000;
const start = async ()=> {
    try {
    // connect to MongoDB
        await connect2DB(process.env.MONGO_URI)
        app.listen(port, ()=> {
            console.log(`server listening on port ${port}...`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();
