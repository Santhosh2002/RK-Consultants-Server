const mongoose = require("mongoose"); 

const generalSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    about:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    facebook:{
        type: String,
        required: true
    },
    instagram:{
        type: String,
        required: true
    },
    linkedin:{
        type: String,
        required: true
    },
    terms:{
        type: String,
        required: true
    },
    privacy:{
        type: String,
        required: true
    },
    youtube:{
        type: String,
        default: ""
    },
    shippingPolicy: {
        type:String, 
        default: ""
    },
    refundPolicy: {
        type:String, 
        default: ""
    }
}); 

const General = mongoose.model("General", generalSchema);

module.exports = General;