const mongoose  = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name must be provided'] //2nd arg is for error display
    },
    price: {
        type: Number,
        required: [true, 'price must be provided'] //2nd arg is for error display
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    company: {
        //setting limited choices for input data
        type: String,
        enum:{
            values: ['ikea', 'liddy', 'caressa', 'marcos'],//for possible choices
             //in case input data is not match with above choices
            message: '{VALUES} is not supported'
        }

    }
})

module.exports = mongoose.model('Product', productSchema)