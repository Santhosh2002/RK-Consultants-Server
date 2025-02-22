const Stats = require("../model/stats.model");

exports.getStats = async (req, res) => {
  try {
    const stats = await Stats.findOne();
    if (!stats) {
      return res.status(404).json({ message: "Stats not found" });
    }
    res.status(200).json({ stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createStats = async (req, res) => {
  try {
    const stats = new Stats(req.body); // Directly using req.body for input
    await stats.save();
    res.status(201).json({ message: "Stats created successfully", stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStats = async (req, res) => {
  try {
    const stats = await Stats.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!stats) {
      return res.status(404).json({ message: "Stats not found" });
    }
    res.status(200).json({ message: "Stats updated successfully", stats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
