const express = require("express");
const {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
} = require("../controller/projects.controller");
const adminMiddleware = require("../middleware/admin.middleware");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API endpoints for managing projects
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - startDate
 *         - endDate
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the project
 *           example: "New Project"
 *         description:
 *           type: string
 *           description: Project description
 *           example: "A large-scale commercial construction project."
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of the project
 *           example: "2025-02-15"
 *         endDate:
 *           type: string
 *           format: date
 *           description: Expected end date of the project
 *           example: "2025-06-30"
 */

/**
 * @swagger
 * /api/projects/create:
 *   post:
 *     summary: Create a new project (Admin only)
 *     description: Adds a new project to the database.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Project"
 *     responses:
 *       201:
 *         description: Project created successfully
 *       400:
 *         description: Bad Request - Missing required fields
 *       403:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Internal Server Error
 */
router.post("/create", adminMiddleware, createProject);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     description: Retrieve a list of all projects from the database.
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Project"
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getAllProjects);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project details
 *     description: Retrieve details of a specific project by ID.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Project details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Project"
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", getProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update a project (Admin only)
 *     description: Update details of a specific project by ID.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Project"
 *     responses:
 *       200:
 *         description: Project updated successfully
 *       400:
 *         description: Bad Request - Invalid ID or missing fields
 *       403:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", adminMiddleware, updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project (Admin only)
 *     description: Remove a specific project by ID.
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The project ID
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *       400:
 *         description: Bad Request - Invalid ID
 *       403:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", adminMiddleware, deleteProject);

module.exports = router;
