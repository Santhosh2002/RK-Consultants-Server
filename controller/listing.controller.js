const { model } = require('mongoose');
const Listing  = require('../model/listing.model');
const createListing = async (req, res) => {
    const {
        title,
        description,
        contact,
        images,
        price,
        visible,
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
        balcony,
        video
    } = req.body;

    // Check for required fields
    if (!title || !contact || !price) {
        return res.status(400).json({ message: "Title, Contact, and Price are required" });
    }

    try {
        const listing = new Listing({
            title,
            description,
            contact,
            images,
            price,
            visible,
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
            balcony
        });

        await listing.save();
        res.status(201).json({ message: "Listing created successfully", listing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getListingDetails = async(req,res)=>{
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        res.status(200).json({ listing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const updateListings = async (req, res) => {
    const { id } = req.params;
    const {
        visible,
        title,
        description,
        contact,
        images,
        price,
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
        balcony
    } = req.body;

    try {
        // Find the listing by ID
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }

        // Update only the fields provided in the request body
        if (visible !== undefined) listing.visible = visible;
        if (title) listing.title = title;
        if (description) listing.description = description;
        if (contact) listing.contact = contact;
        if (images) listing.images = images;
        if (price) listing.price = price;
        if (bhk) listing.bhk = bhk;
        if (carpetArea) listing.carpetArea = carpetArea;
        if (transactionType) listing.transactionType = transactionType;
        if (furnishingStatus) listing.furnishingStatus = furnishingStatus;
        if (floor) listing.floor = floor;
        if (facing) listing.facing = facing;
        if (status) listing.status = status;
        if (parking) listing.parking = parking;
        if (amenities) listing.amenities = amenities;
        if (ownership) listing.ownership = ownership;
        if (age) listing.age = age;
        if (landmark) listing.landmark = landmark;
        if (bedrooms) listing.bedrooms = bedrooms;
        if (bathrooms) listing.bathrooms = bathrooms;
        if (balcony) listing.balcony = balcony;
        if (video) listing.video = video

        // Save the updated listing
        await listing.save();

        res.status(200).json({ message: "Listing updated successfully", listing });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteListing = async (req, res) => {
    const { id } = req.params;
    try {
        const listing = await Listing.findById(id);
        if (!listing) {
            return res.status(404).json({ message: "Listing not found" });
        }
        await listing.deleteOne();
        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getListing = async (req, res) => {
    try {
        const listings = await Listing.find();
        res.status(200).json({ listings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getVisibleListing = async (req, res) => {
    try {
        const listings = await Listing.find({ visible: true });
        res.status(200).json({ listings });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {createListing, updateListings, deleteListing, getListing, getVisibleListing,getListingDetails};