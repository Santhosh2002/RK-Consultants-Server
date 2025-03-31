const express = require("express");
const {
  createProject,
  getAllProjects,
  getProject,
  updateProject,
  deleteProject,
  getProjectBySlug,
  searchProjects,
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
 * /api/project/create:
 *   post:
 *     summary: Create a new project (Admin only)
 *     description: Adds a new project to the database.
 *     tags: [Projects]
 *     security:
 *       - BearerAuth: []  # 🔒 Requires authentication
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
 * /api/project:
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
 * /api/project/slug/{slug}:
 *   get:
 *     summary: Get project by slug
 *     description: Retrieve project details using the SEO-friendly slug.
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique slug of the project
 *     responses:
 *       200:
 *         description: Project retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Project"
 *       404:
 *         description: Project not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/slug/:slug", getProjectBySlug);
/**
 * @swagger
 * /api/project/search:
 *   get:
 *     summary: Search projects
 *     description: Search for projects using filters like location, price range, property type, etc. Supports pagination.
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Free text search in title, description, nearby, etc.
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         description: City name
 *       - in: query
 *         name: propertyType
 *         schema:
 *           type: string
 *           enum: [Apartment, Villa, Office, Land, Shop, Other]
 *         description: Type of property
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: integer
 *         description: Minimum price
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: integer
 *         description: Maximum price
 *       - in: query
 *         name: buildYear
 *         schema:
 *           type: string
 *           format: year
 *         description: Filter projects created in this year
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Filtered project results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 page:
 *                   type: integer
 *                 limit:
 *                   type: integer
 *                 totalPages:
 *                   type: integer
 *                 totalResults:
 *                   type: integer
 *                 projects:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Project"
 *       500:
 *         description: Internal Server Error
 */
router.get("/search", searchProjects);
/**
 * @swagger
 * /api/project/{id}:
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
 * /api/project/{id}:
 *   put:
 *     summary: Update a project (Admin only)
 *     description: Update details of a specific project by ID.
 *     tags: [Projects]
 *     security:
 *       - BearerAuth: []  # 🔒 Requires authentication
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
 * /api/project/{id}:
 *   delete:
 *     summary: Delete a project (Admin only)
 *     description: Remove a specific project by ID.
 *     tags: [Projects]
 *     security:
 *       - BearerAuth: []  # 🔒 Requires authentication
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
