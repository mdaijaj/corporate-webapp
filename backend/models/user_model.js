const mongoose = require('../database/db');
const Schema = mongoose.Schema

var UserSchema = new Schema({
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    },
    mobile: {
        type: Number,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    birth_Date: {
        type: Date,
    },
    password: {
        type: String,
    },
    addressline1:{
        type: String,
    },
    addressline2:{
        type: String,
    },
    district:{
        type: String,
    },
    city:{
        type: String,
    },
    state:{
        type: String,
    },
    pincode:{
        type: String,   //6 digit valid pincode
    },
    status: {
        type: Boolean,
        default: true
    },
    panNumber:{          // – [Valid PAN number format 5 Chars 4 Digits 1 Char]
        type: String,   
    }, 
    vehicleNumber:{        // [Valid Vehicle Number 2 CHAR 2 Digit 2 Chars 1-4 Digits]
        type: String,  
    },
    role_name:{        // [Valid Vehicle Number 2 CHAR 2 Digit 2 Chars 1-4 Digits]
        type: String,  
    },
}, {
    timestamps: true
});

const UserDetail = mongoose.model('userdetail', UserSchema);
module.exports = UserDetail;