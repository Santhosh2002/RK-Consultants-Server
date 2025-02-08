const Project = require('../model/project.model');

exports.createProject = async (req,res) => {
    const {title, image, description, startDate,brochure, price,
        bhk,
        carpetArea,
        transactionType,
        furnishingStatus,
        floor,
        facing,
        status,
        parking,
        amenities,
        ownership,
        age,
        landmark,
        bedrooms,
        bathrooms,
        video, 
        balcony} = req.body;
    if(!title || !startDate){
        return res.status(400).json({message: "Title and Start Date are required"});
    }
    try {
        const newProject = new Project({title, image, description, startDate, status ,brochure, price,
            bhk,
            carpetArea,
            transactionType,
            furnishingStatus,
            floor,
            facing,
            status,
            parking,
            amenities,
            ownership,
            age,
            landmark,
            video,
            bedrooms,
            bathrooms,
            balcony});
        await newProject.save();
        res.status(201).json({message: "Project created successfully",project : newProject});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
exports.getAllProjects = async (req,res) => {
    try {
        const projects = await Project.find();
        res.status(200).json({projects});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getProject = async (req,res) => {
    const {id} = req.params;
    try {
        const project = await Project.findById(id);
        if(!project){
            return res.status(404).json({message: "Project not found"});
        }
        res.status(200).json({project});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
exports.deleteProject = async (req,res) => {
    const {id} = req.params;
    try {
        const project = await Project.findById(id);
        if(!project){
            return res.status(404).json({message: "Project not found"});
        }
        await project.deleteOne();
        res.status(200).json({message: "Project deleted", project});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.updateProject = async (req,res) => {
    const {id} = req.params;
    const {title, image, description, startDate, status,brochure, price,
        bhk,
        carpetArea,
        transactionType,
        furnishingStatus,
        floor,
        facing,
        parking,
        amenities,
        ownership,
        age,
        landmark,
        bedrooms,
        bathrooms,
        video,
        balcony} = req.body;
    if(!id){
        return res.status(400).json({message: "Project ID is required"});
    }
    try {
        const project = await Project.findById(id);
        if(!project){
            return res.status(404).json({message: "Project not found"});
        }
        if(!project){
            return res.status(404).json({message: "Project not found"});
        }
        project.image = image || project.image;
        project.description = description || project.description;
        project.startDate = startDate || project.startDate;
        project.status = status || project.status;
        project.title = title || project.title;
        project.brochure = brochure || project.brochure;
        project.price = price || project.price;
        project.bhk = bhk || project.bhk;
        project.carpetArea = carpetArea || project.carpetArea;
        project.bathrooms = bathrooms ||    project.bathrooms ; 
        project.balcony = balcony || project.balcony; 
        project.transactionType = transactionType || project.transactionType;
        project.furnishingStatus = furnishingStatus || project.furnishingStatus;
        project.floor = floor || project.floor;
        project.facing = facing || project.facing;
        project.parking = parking || project.parking;
        project.amenities = amenities || project.amenities;
        project.ownership = ownership || project.ownership;
        project.age = age || project.age;
        project.landmark = landmark || project.landmark;
        project.bedrooms = bedrooms || project.bedrooms;
        project.video = video || project.video;



        await project.save();
        res.status(200).json({message: "Project updated successfully", project});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}