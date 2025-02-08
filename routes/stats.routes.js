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
 *   description: API endpoints for retrieving and managing stats
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
 *                   type: object
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getStats);

/**
 * @swagger
 * /api/stats/{id}:
 *   post:
 *     summary: Update statistics (Admin only)
 *     description: Update specific statistics by ID.
 *     tags: [Stats]
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *             properties:
 *               views:
 *                 type: number
 *                 example: 1500
 *               clicks:
 *                 type: number
 *                 example: 350
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
router.post("/:id", adminMiddleware, updateStats);

module.exports = router;
