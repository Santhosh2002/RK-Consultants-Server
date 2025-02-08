const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: false,
        default:"",
    },
    image:{
        type: String,
        required: false,
        default:"", 
    },
    status:{
        type: String,
        required: true,
        default: 'active',
    },
    
},{
    timestamps:true 
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client