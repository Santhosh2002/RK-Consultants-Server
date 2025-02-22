const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const logger = require("../utils/logger.utils");

dotenv.config();

exports.getUser = async (req, res) => {
  try {
    const users = await User.find({}, "username role"); // Only fetch required fields
    logger.info(`Fetched ${users.length} users`);
    res.status(200).json({ users });
  } catch (error) {
    logger.error(`Error fetching users: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id, "username role");
    if (!user) return res.status(404).json({ error: "User not found" });

    logger.info(`Fetched user: ${user.username}`);
    res.status(200).json(user);
  } catch (error) {
    logger.error(`Error fetching user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.createUser = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and Password are required" });

  if (!["admin", "user"].includes(role))
    return res.status(400).json({ message: "Invalid role" });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();

    logger.info(`User ${username} created successfully`);
    res.status(201).json({ username: newUser.username, role: newUser.role });
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    logger.info(`User ${username} logged in successfully`);
    res.status(200).json({ id: user._id, token, role: user.role });
  } catch (error) {
    logger.error(`Error logging in: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Forbidden" });

  try {
    const deletedUser = await User.findOneAndDelete({
      username: req.params.username,
    });
    if (!deletedUser)
      return res.status(404).json({ message: "User not found" });

    logger.info(`User ${req.params.username} deleted successfully`);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting user: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};

exports.changePassword = async (req, res) => {
  const { username, password } = req.body;
  if (req.user.role !== "admin" && req.user.username !== username)
    return res.status(403).json({ message: "Forbidden" });

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    logger.info(`Password changed successfully for user ${username}`);
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    logger.error(`Error changing password: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
