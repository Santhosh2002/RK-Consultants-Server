const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    subServices : {
        type: Array,
        required:true, 
        default: [],
    },
    image:{
        type: String,
        default: "", 
        
    }


},{timestamps: true});

const Service = mongoose.model('Service', serviceSchema);
module.exports = Service;