const express = require("express");
const {
  createClient,
  getAllClients,
  updateClient,
} = require("../controller/client.controller");
const adminMiddleware = require("../middleware/admin.middleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clients
 *   description: API endpoints for managing clients
 */

/**
 * @swagger
 * /api/clients/createClient:
 *   post:
 *     summary: Create a new client
 *     description: Adds a new client to the database. Only accessible by an admin.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: "active"
 *               image:
 *                 type: string
 *                 example: "https://example.com/profile.jpg"
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 client:
 *                   type: object
 *       400:
 *         description: Bad Request - Missing required fields
 *       500:
 *         description: Internal Server Error
 */
router.post("/createClient", adminMiddleware, createClient);

/**
 * @swagger
 * /api/clients:
 *   get:
 *     summary: Get all clients
 *     description: Retrieve a list of all clients from the database.
 *     tags: [Clients]
 *     responses:
 *       200:
 *         description: A list of clients
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clients:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getAllClients);

/**
 * @swagger
 * /api/clients/{id}:
 *   post:
 *     summary: Update a client
 *     description: Update client details by ID. Only accessible by an admin.
 *     tags: [Clients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "john@example.com"
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *                 example: "inactive"
 *               image:
 *                 type: string
 *                 example: "https://example.com/profile.jpg"
 *     responses:
 *       200:
 *         description: Client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 client:
 *                   type: object
 *       400:
 *         description: Bad Request - Missing client ID
 *       404:
 *         description: Client not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/:id", adminMiddleware, updateClient);

module.exports = router;
