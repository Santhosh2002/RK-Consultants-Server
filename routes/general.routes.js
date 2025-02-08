const {
  getGeneral,
  updateGeneral,
  createGeneral,
} = require("../controller/general.controller");
const express = require("express");
const router = express.Router();
const adminMiddleware = require("../middleware/admin.middleware");

/**
 * @swagger
 * tags:
 *   name: General
 *   description: API endpoints for managing general settings
 */

/**
 * @swagger
 * /api/general:
 *   get:
 *     summary: Get general settings
 *     description: Retrieve general settings from the database.
 *     tags: [General]
 *     responses:
 *       200:
 *         description: General settings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getGeneral);

/**
 * @swagger
 * /api/general/create:
 *   post:
 *     summary: Create general settings
 *     description: Adds general settings to the database. Only accessible by an admin.
 *     tags: [General]
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
 *               - value
 *             properties:
 *               name:
 *                 type: string
 *                 example: "site_name"
 *               value:
 *                 type: string
 *                 example: "My Website"
 *     responses:
 *       201:
 *         description: General settings created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad Request - Missing required fields
 *       500:
 *         description: Internal Server Error
 */
router.post("/create", adminMiddleware, createGeneral);

/**
 * @swagger
 * /api/general/{id}:
 *   post:
 *     summary: Update general settings
 *     description: Update general settings by ID. Only accessible by an admin.
 *     tags: [General]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The general settings ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "site_name"
 *               value:
 *                 type: string
 *                 example: "Updated Website Name"
 *     responses:
 *       200:
 *         description: General settings updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad Request - Missing ID
 *       404:
 *         description: General settings not found
 *       500:
 *         description: Internal Server Error
 */
router.post("/:id", adminMiddleware, updateGeneral);

module.exports = router;
