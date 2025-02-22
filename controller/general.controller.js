const General = require("../model/general.model");

exports.createGeneral = async (req, res) => {
  try {
    const newGeneral = new General(req.body); // Directly using req.body to create a new entry
    await newGeneral.save();
    res.status(201).json({
      message: "General information created successfully",
      general: newGeneral,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getGeneral = async (req, res) => {
  try {
    const general = await General.findOne();
    if (!general) {
      return res.status(404).json({ message: "General information not found" });
    }
    res.status(200).json({ general });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateGeneral = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "General ID is required" });
  }

  try {
    const general = await General.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!general) {
      return res.status(404).json({ message: "General information not found" });
    }
    res
      .status(200)
      .json({ message: "General information updated successfully", general });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
