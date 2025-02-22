const express = require("express");
const {
  createService,
  getAllServices,
  deleteService,
  deleteAllServices,
  updateService,
} = require("../controller/services.controller");
const adminMiddleware = require("../middleware/admin.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Services
 *   description: API endpoints for managing services
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - category
 *         - price
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the service
 *           example: "Web Development"
 *         description:
 *           type: string
 *           description: Description of the service
 *           example: "Providing web development services."
 *         category:
 *           type: string
 *           enum: ["Construction", "Interior Design", "Real Estate Consulting", "Legal Services", "Other"]
 *           description: Category of the service
 *           example: "Real Estate Consulting"
 *         price:
 *           type: number
 *           description: Price of the service
 *           example: 5000
 *         currency:
 *           type: string
 *           default: "INR"
 *           description: Currency used
 *           example: "INR"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *             example: "https://example.com/image.jpg"
 *         status:
 *           type: string
 *           enum: ["Available", "Temporarily Unavailable", "Discontinued"]
 *           description: Current availability status of the service
 *           example: "Available"
 *         subServices:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the sub-service
 *                 example: "SEO Optimization"
 *               description:
 *                 type: string
 *                 description: Description of the sub-service
 *                 example: "SEO services to optimize websites."
 *               price:
 *                 type: number
 *                 example: 2000
 */

/**
 * @swagger
 * /api/service/create:
 *   post:
 *     summary: Create a new service (Admin only)
 *     description: Adds a new service to the database.
 *     tags: [Services]
 *     security:
 *       - BearerAuth: []  # 🔒 Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Service"
 *     responses:
 *       201:
 *         description: Service created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Service"
 *       400:
 *         description: Bad Request - Missing required fields
 *       403:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Internal Server Error
 */
router.post("/create", adminMiddleware, createService);

/**
 * @swagger
 * /api/service:
 *   get:
 *     summary: Get all services
 *     description: Retrieve a list of all services from the database.
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: A list of services
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 services:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Service"
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getAllServices);

/**
 * @swagger
 * /api/service/{id}:
 *   delete:
 *     summary: Delete a specific service (Admin only)
 *     description: Removes a service from the database by ID.
 *     tags: [Services]
 *     security:
 *       - BearerAuth: []  # 🔒 Requires authentication  # 🔒 Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     responses:
 *       200:
 *         description: Service deleted successfully
 *       400:
 *         description: Bad Request - Invalid ID
 *       403:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", adminMiddleware, deleteService);

/**
 * @swagger
 * /api/service/deleteAll:
 *   delete:
 *     summary: Delete all services (Admin only)
 *     description: Removes all services from the database.
 *     tags: [Services]
 *     security:
 *       - BearerAuth: []  # 🔒 Requires authentication
 *     responses:
 *       200:
 *         description: All services deleted successfully
 *       403:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Internal Server Error
 */
router.delete("/deleteAll", adminMiddleware, deleteAllServices);

/**
 * @swagger
 * /api/service/{id}:
 *   put:
 *     summary: Update a service (Admin only)
 *     description: Update details of a specific service by ID.
 *     tags: [Services]
 *     security:
 *       - BearerAuth: []  # 🔒 Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The service ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Service"
 *     responses:
 *       200:
 *         description: Service updated successfully
 *       400:
 *         description: Bad Request - Invalid ID or missing fields
 *       403:
 *         description: Unauthorized - Admin access required
 *       404:
 *         description: Service not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", adminMiddleware, updateService);

module.exports = router;
