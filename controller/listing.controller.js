const Listing = require("../model/listing.model");

exports.createListing = async (req, res) => {
  try {
    const listing = new Listing(req.body); // Directly using req.body for input
    await listing.save();
    res.status(201).json({ message: "Listing created successfully", listing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getListingDetails = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json({ listing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateListings = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json({ message: "Listing updated successfully", listing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }
    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getListing = async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json({ listings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVisibleListing = async (req, res) => {
  try {
    const listings = await Listing.find({ visible: true });
    res.status(200).json({ listings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
