
const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
    happyClients :{
        type: Number,
        required: true,
        default: 0,
    },
    projects:{
        type: Number,
        required: true,
        default: 0,
    },
    daysOfWork:{
        type: Number,
        required: true,
        default: 0,
    },

}); 

const Stats = mongoose.model('Stats', statsSchema);
module.exports = Stats; 