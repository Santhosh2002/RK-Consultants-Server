const mongoose = require("mongoose"); 
const visitorSchema = new mongoose.Schema({
    
},{timestamps:true}); 


const Visitor = mongoose.model('Visitor', visitorSchema);

module.exports = Visitor 