const Visitor = require("../model/visitors.model");


const addVisitor = async(req,res) =>{
    try{
        const newVisitor = new Visitor({});
        await newVisitor.save(); 
        const total = await Visitor.find(); 
        res.send({total : total}); 
    }
    catch(err){
        console.log(err); 
    }
}

const getVisitors = async(req,res) =>{
    try {
        const visitors = await Visitor.find(); 
        const total = visitors.length ;
        res.status(200).send({total: total,visitors : visitors}); 
    }
    catch(err){
        res.status(500).send({message:err});
    }
}

module.exports   = {
    getVisitors,
    addVisitor
}; 