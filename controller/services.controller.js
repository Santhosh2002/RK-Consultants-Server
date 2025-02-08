
const Service = require('../model/services.model');


const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.status(200).send({services});
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
}
const createService = async (req, res) => {
    const {name, description ,image, subServices} = req.body;
    if(!name){
        return res.status(400).send({message: 'Name is required'});
    }
    try {
        const service = new Service({
            name,
            image, 
            description,
            subServices
        });
        await service.save();
        res.status(201).send(service);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
}
const deleteService = async (req, res) => {
    const {id} = req.params;
    try {
        const service = await Service.findById(id);
        if(!service){
            return res.status(404).send({message: 'Service not found'});
        }
        
        await service.deleteOne()
        
        res.status(200).send({message: 'Service deleted'});
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
}
const deleteAllServices = async(req,res)=>{
    try {
        await Service.deleteMany();
        res.status(200).send({message: 'All services deleted'});
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
}
const updateService = async (req, res) => {
    const {id} = req.params;
    const {name, description,image , subServices} = req.body;
    if(!name){
        return res.status(400).send({message: 'Name is required'});
    }
    try {
        const service = await Service.findById(id);
        if(!service){
            return res.status(404).send({message: 'Service not found'});
        }
        service.name = name || service.name;
        service.description = description || service.description;
        service.image = image || service.image;
        service.subServices = subServices || service.subServices;
        
        
        await service.save();
        res.status(200).send(service);
    } catch (error) {
        console.log(error);
        res.status(500).send({error: error.message});
    }
}

module.exports = {
    getAllServices,
    createService,
    deleteService,
    deleteAllServices,
    updateService
}