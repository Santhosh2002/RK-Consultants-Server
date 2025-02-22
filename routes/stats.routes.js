const express = require("express");
const {
  getStats,
  updateStats,
  createStats,
} = require("../controller/stats.controller");
const adminMiddleware = require("../middleware/admin.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Stats
 *   description: API endpoints for retrieving and managing statistics
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Stats:
 *       type: object
 *       required:
 *         - happyClients
 *         - projects
 *         - daysOfWork
 *       properties:
 *         happyClients:
 *           type: number
 *           description: Total number of happy clients
 *           example: 150
 *         projects:
 *           type: number
 *           description: Total number of completed projects
 *           example: 50
 *         daysOfWork:
 *           type: number
 *           description: Total number of days of work
 *           example: 365
 */

/**
 * @swagger
 * /api/stats:
 *   get:
 *     summary: Get statistics data
 *     description: Retrieve statistics from the database.
 *     tags: [Stats]
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 stats:
 *                   $ref: "#/components/schemas/Stats"
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getStats);

/**
 * @swagger
 * /api/stats/create:
 *   post:
 *     summary: Create statistics (Admin only)
 *     description: Adds new statistics to the database.
 *     tags: [Stats]
 *     security:
 *       - BearerAuth: []  # 🔒 Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Stats"
 *     responses:
 *       201:
 *         description: Statistics created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Stats"
 *       400:
 *         description: Bad Request - Missing required fields
 *       403:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Internal Server Error
 */
router.post("/create", adminMiddleware, createStats);

/**
 * @swagger
 * /api/stats/{id}:
 *   put:
 *     summary: Update statistics (Admin only)
 *     description: Update specific statistics by ID.
 *     tags: [Stats]
 *     security:
 *       - BearerAuth: []  # 🔒 Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The statistics ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Stats"
 *     responses:
 *       200:
 *         description: Statistics updated successfully
 *       400:
 *         description: Bad Request - Invalid ID or missing fields
 *       403:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Statistics not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", adminMiddleware, updateStats);

module.exports = router;
