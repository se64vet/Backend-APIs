require('dotenv').config();
require('express-async-errors');

//extra security packagges
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');


const express = require('express');
const app = express();
// import routers
const authRouters = require('./routes/auth');
const jobsRouters = require('./routes/jobs');
// import connect Database
const connectDB = require('./db/connect')
// import authenticate MW to protect Job routes
const authenticatedUser =  require('./middlewares/authentication')

// import error handlers
const errorHandlerMW = require('./middlewares/error-handler');
const notFoundMW = require('./middlewares/not-found');

// use utils
app.set('trust proxy', 1); //  enable when behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx)
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 100, // limit each IP to 100 request per windowMs
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
//extra packages

//routes
app.use('/api/auth', authRouters);
app.use('/api/jobs', authenticatedUser, jobsRouters);

//Routing Errors MW
app.use(notFoundMW);
app.use(errorHandlerMW);

//starting a server on manual port
const PORT = process.env.PORT || 5000;
const start = async()=> {
    
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(PORT, ()=> {
            console.log(`APP is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
start()