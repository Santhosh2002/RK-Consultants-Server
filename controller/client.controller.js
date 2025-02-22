const Client = require("../model/client.model");

exports.createClient = async (req, res) => {
  try {
    const newClient = new Client(req.body); // Directly use req.body to create a new client
    await newClient.save();
    res
      .status(201)
      .json({ message: "Client created successfully", client: newClient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json({ clients });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateClient = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Client ID is required" });
  }

  try {
    const client = await Client.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client updated successfully", client });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
