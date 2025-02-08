const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,

    },
    brochure:{
        type: String,
        required: false,
        default:"",
    },
    image:{
        type: String,
        required: false,
        default:"", 
    },
    description:{
        type: String,
        required: false,
    },
    startDate:{
        type: Date,
        required: true,
        default: Date.now,
    },
    status:{
        type: String,
        required: true,
        default: 'active',
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
    video:{
        type:String,
        default : ""
    }
},{
    timestamps:true 
}); 

const Project = mongoose.model('Project', projectSchema);
module.exports = Project