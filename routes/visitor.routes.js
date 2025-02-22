const express = require("express");
const { addVisitor, getVisitors } = require("../controller/visitor.controller");
const adminMiddleware = require("../middleware/admin.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Visitors
 *   description: API endpoints for managing visitor tracking
 */

/**
 * @swagger
 * /api/visitor/add:
 *   post:
 *     summary: Add a new visitor
 *     description: Logs a new visitor entry into the system.
 *     tags: [Visitors]
 *     responses:
 *       201:
 *         description: Visitor added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   example: 1523
 *       500:
 *         description: Internal Server Error
 */
router.post("/add", addVisitor);

/**
 * @swagger
 * /api/visitor/visitors:
 *   get:
 *     summary: Get visitor statistics
 *     description: Retrieve visitor statistics, including total visitor count.
 *     tags: [Visitors]
 *     responses:
 *       200:
 *         description: Visitor statistics retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   example: 1523
 *                 visitors:
 *                   type: array
 *                   items:
 *                     type: object
 *       500:
 *         description: Internal Server Error
 */
router.get("/visitors", getVisitors);

module.exports = router;
