
// this error handler is for Notfound in Routing
const NotFound = (req, res)=> {
    res.status(404).send("The Page/Route requested not found !");
}

module.exports = NotFound;