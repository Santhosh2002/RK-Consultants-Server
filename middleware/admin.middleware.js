const jsonwebtoken = require("jsonwebtoken");
const User = require("../model/user.model");
const dotenv = require("dotenv");
dotenv.config();

const adminMiddleware = async (req, res, next) => {
  let token = req.header("Authorization") || req.header("authorization");

  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }

  try {
    console.log("Received Token:", token);

    // Ensure it's a Bearer token
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trim(); // Remove "Bearer "
    } else {
      return res.status(401).json({ message: "Invalid token format" });
    }

    const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

    console.log("decoded", decoded);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user", user);
    req.user = user; // Attach user to request

    if (user.role === "admin") {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "Forbidden: Admin access required" });
    }
  } catch (error) {
    console.error("Token Verification Error:", error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = adminMiddleware;
