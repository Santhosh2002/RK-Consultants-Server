const Visitor = require("../model/visitors.model");

exports.addVisitor = async (req, res) => {
  try {
    await new Visitor().save(); // Save a new visitor entry
    const total = await Visitor.countDocuments(); // Get the total count directly
    res.status(201).json({ total });
  } catch (error) {
    console.error(`Error adding visitor: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

exports.getVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.status(200).json({ total: visitors.length, visitors });
  } catch (error) {
    console.error(`Error fetching visitors: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};
