const express = require("express");
const {
  createTestimonial,
  getAllTestimonials,
  getTestimonialById,
  updateTestimonial,
  deleteTestimonial,
  deleteAllTestimonials,
} = require("../controller/testimonial.controller");
const adminMiddleware = require("../middleware/admin.middleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Testimonials
 *   description: API endpoints for managing testimonials
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Testimonial:
 *       type: object
 *       required:
 *         - rating
 *         - title
 *         - message
 *         - author
 *       properties:
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           example: 5
 *         title:
 *           type: string
 *           example: "Exceptional Service!"
 *         message:
 *           type: string
 *           example: "Our experience with Estatein was outstanding..."
 *         showMoreLink:
 *           type: string
 *           example: "https://example.com/read-more"
 *         author:
 *           type: object
 *           required:
 *             - name
 *             - location
 *           properties:
 *             name:
 *               type: string
 *               example: "Wade Warren"
 *             avatarUrl:
 *               type: string
 *               example: "https://example.com/avatar.jpg"
 *             location:
 *               type: object
 *               properties:
 *                 country:
 *                   type: string
 *                   example: "USA"
 *                 state:
 *                   type: string
 *                   example: "California"
 */

/**
 * @swagger
 * /api/testimonial/create:
 *   post:
 *     summary: Create a new testimonial (Admin only)
 *     tags: [Testimonials]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Testimonial"
 *     responses:
 *       201:
 *         description: Testimonial created successfully
 *       400:
 *         description: Bad Request
 *       403:
 *         description: Unauthorized - Admin access required
 *       500:
 *         description: Internal Server Error
 */
router.post("/create", adminMiddleware, createTestimonial);

/**
 * @swagger
 * /api/testimonial:
 *   get:
 *     summary: Get all testimonials
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: List of testimonials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 testimonials:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Testimonial"
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getAllTestimonials);

/**
 * @swagger
 * /api/testimonial/{id}:
 *   get:
 *     summary: Get a testimonial by ID
 *     tags: [Testimonials]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The testimonial ID
 *     responses:
 *       200:
 *         description: Testimonial found
 *       404:
 *         description: Testimonial not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", getTestimonialById);

/**
 * @swagger
 * /api/testimonial/{id}:
 *   put:
 *     summary: Update a testimonial (Admin only)
 *     tags: [Testimonials]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The testimonial ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Testimonial"
 *     responses:
 *       200:
 *         description: Testimonial updated successfully
 *       400:
 *         description: Invalid ID or payload
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Testimonial not found
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", adminMiddleware, updateTestimonial);

/**
 * @swagger
 * /api/testimonial/{id}:
 *   delete:
 *     summary: Delete a testimonial (Admin only)
 *     tags: [Testimonials]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The testimonial ID
 *     responses:
 *       200:
 *         description: Testimonial deleted successfully
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Testimonial not found
 *       500:
 *         description: Internal Server Error
 */
router.delete("/:id", adminMiddleware, deleteTestimonial);

/**
 * @swagger
 * /api/testimonial/deleteAll:
 *   delete:
 *     summary: Delete all testimonials (Admin only)
 *     tags: [Testimonials]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: All testimonials deleted
 *       403:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.delete("/deleteAll", adminMiddleware, deleteAllTestimonials);

module.exports = router;
