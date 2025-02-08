const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default : ""
    },
    contact: {
        type: String,
        required: true
    },
    images:{
        type: Array,
        default : []
    },
    price:{
        type:String, 
        default : "0", 
    },
    visible:{
        type: Boolean,
        default : false
    },
    bhk:{
        type:String, 
        default :"1BHK",
    },
    carpetArea:{
        type:String, 
        default : "0",
    },
    transactionType:{
        type:String, 
        default : "Rent",
    },
    furnishingStatus:{
        type:String, 
        default : "Unfurnished",
    },
    floor:{
        type:String, 
        default : "0",
    },
    facing:{
        type:String, 
        default : "",
    },
    status:{
        type:String, 
        default : "Not Disclosed",
    },
    parking:{
        type:String, 
        default : "",   
    },
    amenities:{
        type:Array,
        default : []
    },
    ownership :{
        type:String, 
        default : "Not Disclosed",
    },
    age:{
        type:String, 
        default : "0",
    },
    landmark:{
        type:String, 
        default : "",
    },
    bedrooms:{
        type:String, 
        default : "0",
    },
    bathrooms:{
        type:String, 
        default : "0",
    },
    balcony:{
        type:String, 
        default : "0",
    },
    video : {
        type : String,
        default : ""
    }

},{
    timestamps: true
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;