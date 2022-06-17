
const express = require('express');
const app = express();
const order = require("./routes/order")

app.get('/', (req, res)=> {
    res.send('server run !')
})

app.use('/order', order);






// Start Server
const PORT = process.env.PORT || 5000;
const start = ()=> {
    try {
        // const connectDatabase = await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=> {
            console.log('App listening on port', PORT);
        })
    } catch (error) {
        console.log(error);
    }
}
start();