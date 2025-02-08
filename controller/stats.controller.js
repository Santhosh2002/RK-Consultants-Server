const Stats = require('../model/stats.model');

exports.getStats = async (req, res) => {
    try {
        const stats = await Stats.findOne();
        res.status(200).json({stats});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
exports.updateStats = async (req, res) => {
    const {id} = req.params;
    const {happyClients,projects,daysOfWork} = req.body;
    if(!id){
        return res.status(400).json({message: "Stats ID is required"});
    }
    try {
        const stats = await Stats.findById(id);
        if(!stats){
            return res.status(404).json({message: "Stats not found"});
        }
        if(!stats){
            return res.status(404).json({message: "Stats not found"});
        }
        stats.happyClients = happyClients || stats.happyClients;
        stats.projects = projects || stats.projects;
        stats.daysOfWork = daysOfWork || stats.daysOfWork;
        await stats.save();
        res.status(200).json({message: "Stats updated successfully", stats});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
}
exports.createStats = async (req, res) => {
    const {happyClients,projects,daysOfWork} = req.body;
    if(!happyClients || !projects || !daysOfWork){
        return res.status(400).json({message: "All fields are required"});
    }
    try {
        const stats = new Stats({
            happyClients,
            projects,
            daysOfWork,
        });
        await stats.save();
        res.status(201).json(stats);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}