const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const logger = require("../utils/logger.utils"); // ✅ Import logger

dotenv.config();

const getUser = async (req, res) => {
  try {
    const users = await User.find();
    logger.info(`Fetched ${users.length} users`);
    res.status(200).send({
      users: users.map((user) => ({
        username: user.username,
        role: user.role,
      })),
    });
  } catch (error) {
    logger.error(`Error fetching users: ${error.message}`);
    res.status(500).send({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const { username, password, role } = req.body;
  // const user = req.user;

  // if (user.role !== "admin") {
  //   logger.warn(
  //     `Unauthorized user ${user.username} tried to create a new user`
  //   );
  //   return res.status(403).send("Forbidden");
  // }

  if (!username || !password) {
    logger.warn("Missing username or password during user creation");
    return res
      .status(400)
      .send({ message: "Username and Password are required" });
  }

  if (role !== "admin" && role !== "user") {
    logger.warn("Invalid role provided");
    return res.status(400).send({ message: "Invalid role" });
  }

  try {
    const newUser = new User({
      username,
      password,
      role,
    });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    logger.info(`User ${username} created successfully`);
    res.status(201).send(newUser);
  } catch (error) {
    logger.error(`Error creating user: ${error.message}`);
    res.status(500).send({ message: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      logger.warn(`Login failed for username: ${username} - User not found`);
      return res.status(404).send({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(
        `Login failed for username: ${username} - Invalid credentials`
      );
      return res.status(400).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    logger.info(`User ${username} logged in successfully`);
    res.status(200).send({ id: user._id, token, role: user.role });
  } catch (error) {
    logger.error(`Error logging in user: ${error.message}`);
    res.status(500).send({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { username } = req.params;
  const user = req.user;

  if (user.role !== "admin") {
    logger.warn(
      `Unauthorized user ${user.username} attempted to delete user ${username}`
    );
    return res.status(403).send("Forbidden");
  }

  try {
    const deletedUser = await User.findOneAndDelete({ username });
    if (!deletedUser) {
      logger.warn(`User deletion failed - User ${username} not found`);
      return res.status(404).send("User not found");
    }
    logger.info(`User ${username} deleted successfully`);
    res.status(200).send(deletedUser);
  } catch (error) {
    logger.error(`Error deleting user: ${error.message}`);
    res.status(500).send(error);
  }
};

const changePassword = async (req, res) => {
  const { username, password } = req.body;
  const user = req.user;

  if (user.role !== "admin" && user.username !== username) {
    logger.warn(`Unauthorized password change attempt by ${user.username}`);
    return res.status(403).send("Forbidden");
  }

  try {
    const targetUser = await User.findOne({ username });
    if (!targetUser) {
      logger.warn(`Password change failed - User ${username} not found`);
      return res.status(404).send("User not found");
    }

    const salt = await bcrypt.genSalt(10);
    targetUser.password = await bcrypt.hash(password, salt);
    await targetUser.save();

    logger.info(`Password changed successfully for user ${username}`);
    res.status(200).send({
      message: "Password changed successfully",
      user: { username: targetUser.username, role: targetUser.role },
    });
  } catch (error) {
    logger.error(`Error changing password: ${error.message}`);
    res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  login,
  deleteUser,
  getUser,
  changePassword,
};
