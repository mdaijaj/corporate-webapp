const mongoose = require('../database/db');
const Schema = mongoose.Schema

var CompanySchema = new Schema({
    companyNumber: {
        type: Number,
    },
    companyTIN: {
        type: String,
    },
    companyType: {
        type: String,
        enum : ["SME", "MME","LLP","Startup","Private","Public"],
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
        type: Number,   //6 digit valid pincode
    },
    contactPersonName: {
        type: String,
    },
    contactPersonMobileNumber: { // [10 Digit Valid mobile number]
        type: Number,
    },
    contactPersonEmail: {  //[Valid Email Id]
        type: String,
    },
    designation: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
});

const UserDetail = mongoose.model('companydetail', CompanySchema);
module.exports = UserDetail;