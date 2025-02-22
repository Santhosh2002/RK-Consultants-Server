const Service = require("../model/services.model");

exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json({ services });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body); // Directly using req.body for input
    await service.save();
    res.status(201).json({ message: "Service created successfully", service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service updated successfully", service });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAllServices = async (req, res) => {
  try {
    await Service.deleteMany();
    res.status(200).json({ message: "All services deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
