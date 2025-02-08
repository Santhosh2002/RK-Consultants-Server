const General = require("../model/general.model");

exports.createGeneral  = async (req,res) => {
    const {logo, title, about, contact, email, phone, address, facebook, instagram, linkedin, terms, privacy} = req.body;
    if(!logo || !title || !about || !contact || !email || !phone || !address || !facebook || !instagram || !linkedin || !terms || !privacy){
        return res.status(400).json({message: "All fields are required"});
    }
    try {
        const newGeneral = new General({logo, title, about, contact, email, phone, address, facebook, instagram, linkedin, terms, privacy});
        await newGeneral.save();
        res.status(201).json({message: "General information created successfully", general: newGeneral});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.getGeneral = async (req,res) => {
    try {
        const general = await General.findOne();
        if(!general){
            return res.status(404).json({message: "General information not found"});
        }
        res.status(200).json({general});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.updateGeneral = async(req,res)=>{
    const {id} = req.params;
    const {logo, title, about, contact, email, phone, address, facebook, instagram, linkedin, terms, privacy,shippingPolicy,refundPolicy,youtube} = req.body;
    if(!id){
        return res.status(400).json({message: "General ID is required"});
    }
    try {
        const general = await General.findById(id);
        if(!general){
            return res.status(404).json({message: "General information not found"});
        }
        // updating each field ;;
        general.logo = logo || general.logo;
        general.title = title || general.title;
        general.about = about || general.about;
        general.contact = contact || general.contact;
        general.email = email || general.email;
        general.phone = phone || general.phone;
        general.address = address || general.address;
        general.facebook = facebook || general.facebook;
        general.shippingPolicy = shippingPolicy || general.shippingPolicy;
        general.youtube = youtube || general.youtube;
        general.refundPolicy = refundPolicy || general.refundPolicy; 
        general.instagram = instagram || general.instagram;
        general.linkedin = linkedin || general.linkedin;
        general.terms = terms || general.terms;
        general.privacy = privacy || general.privacy;
        await general.save();
        res.status(200).json({message: "General information updated successfully", general});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }
} 