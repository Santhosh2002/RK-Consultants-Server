const express = require("express");
const {
  createUser,
  login,
  getUser,
  deleteUser,
  changePassword,
  getUserById,
} = require("../controller/user.controller");
const adminMiddleware = require("../middleware/admin.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *         - role
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the user
 *           example: "64b5fc2d3fa74b6dbd3c9162"
 *         username:
 *           type: string
 *           unique: true
 *           description: The username of the user
 *           example: "john_doe"
 *         password:
 *           type: string
 *           description: The user's password (hashed)
 *           example: "$2a$12$XyZ12345abcd6789EfGhIj"
 *         role:
 *           type: string
 *           description: The role of the user (admin/user)
 *           default: "user"
 *           example: "admin"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of user creation
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Timestamp of last update
 */

/**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user (Admin only)
 *     description: Creates a new user in the system.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/User"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request - Missing required fields
 *       403:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Internal Server Error
 */
router.post("/register", adminMiddleware, createUser);

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     description: Authenticate user and return an access token.
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "jwt_token_here"
 *       401:
 *         description: Unauthorized - Invalid credentials
 *       400:
 *         description: Bad Request - Missing required fields
 *       500:
 *         description: Internal Server Error
 */
router.post("/login", login);

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get user details (Authenticated)
 *     description: Retrieve details of the logged-in user.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       401:
 *         description: Unauthorized - User not logged in
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getUser);

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID (Admin only)
 *     description: Retrieve details of a user by ID.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/User"
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", adminMiddleware, getUserById);

/**
 * @swagger
 * /api/user/change-password:
 *   put:
 *     summary: Change user password (Admin only)
 *     description: Allows admin to change a user's password.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - newPassword
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               newPassword:
 *                 type: string
 *                 example: "new_secure_password"
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Bad Request - Missing required fields
 *       403:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/change-password", adminMiddleware, changePassword);

/**
 * @swagger
 * /api/user/delete/{id}:
 *   delete:
 *     summary: Delete a user (Admin only)
 *     description: Removes a user from the system by ID.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Bad Request - Invalid ID
 *       403:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/delete/:id", adminMiddleware, deleteUser);

module.exports = router;
