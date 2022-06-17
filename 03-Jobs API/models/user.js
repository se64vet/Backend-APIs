const mongoose = require('mongoose');
const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name box needs to be filled'],

    },
    email: {
        type: String,
        required: [true, 'pls provide your email'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Email is not valid',
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'please provide your password'],
        minLength: 6,
    }
});

// MONGOOSE MIDDLEWARE

// 'pre' save allow us to do something before actually 
//  create and save to database
UserSchema.pre('save', async function(){ // using old function type for 'this' feature
    // hash password before saving to DB
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// methods.__name is a method we can assign to the Schema
// when create it.
UserSchema.methods.createJWT = function(){
    return jwt.sign(
        {userId: this._id, name: this.name, password: this.password}, 
        process.env.JWT,
        {expiresIn: '30d'})
}

UserSchema.methods.checkPassword = async function(guestPassword){
    const isMatch = await bcrypt.compare(guestPassword, this.password);
    return isMatch
}
// we can use dotenv file here because it already run in App.js
module.exports = mongoose.model('user', UserSchema);