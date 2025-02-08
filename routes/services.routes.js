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
 * /api/services/create:
 *   post:
 *     summary: Create a new service (Admin only)
 *     description: Adds a new service to the database.
 *     tags: [Services]
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
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Web Development"
 *               description:
 *                 type: string
 *                 example: "Providing web development services."
 *     responses:
 *       201:
 *         description: Service created successfully
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
 * /api/services:
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
 *                     type: object
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getAllServices);

/**
 * @swagger
 * /api/services/delete/{id}:
 *   delete:
 *     summary: Delete a specific service (Admin only)
 *     description: Removes a service from the database by ID.
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
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
router.delete("/delete/:id", adminMiddleware, deleteService);

/**
 * @swagger
 * /api/services/deleteAll:
 *   delete:
 *     summary: Delete all services (Admin only)
 *     description: Removes all services from the database.
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
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
 * /api/services/{id}:
 *   post:
 *     summary: Update a service (Admin only)
 *     description: Update details of a specific service by ID.
 *     tags: [Services]
 *     security:
 *       - bearerAuth: []
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
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Service Name"
 *               description:
 *                 type: string
 *                 example: "Updated service description."
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
router.post("/:id", adminMiddleware, updateService);

module.exports = router;
