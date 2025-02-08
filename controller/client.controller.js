const Client = require('../model/client.model');

exports.createClient = async (req,res) => {
    const {name , email , status, image } = req.body;
    if(!name){
        return res.status(400).json({message: "Name are required"});
    }
    try {
        const newClient = new Client({name, email, status, image});
        await newClient.save();
        res.status(201).json({message: "Client created successfully",client : newClient});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
exports.getAllClients = async (req,res) => {
    try {
        const clients = await Client.find();
        res.status(200).json({clients});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
exports.updateClient = async (req,res) => {
    const {id} = req.params;
    const {name, email, status, image} = req.body;
    if(!id){
        return res.status(400).json({message: "Client ID is required"});
    }
    try {
        const client = await Client.findById(id);
        if(!client){
            return res.status(404).json({message: "Client not found"});
        }
        if(!client){
            return res.status(404).json({message: "Client not found"});
        }
        client.image = image || client.image;
        client.email = email || client.email;
        client.status = status || client.status;
        client.name = name || client.name;

        await client.save();
        res.status(200).json({message: "Client updated successfully", client});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}