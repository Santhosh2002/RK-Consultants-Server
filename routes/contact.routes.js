const express = require("express");
const {
  createContactEntry,
  getAllContacts,
} = require("../controller/contact.controller");

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Contact:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - phone
 *         - inquiryType
 *         - heardFrom
 *         - message
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         inquiryType:
 *           type: string
 *           enum: [Buying, Selling, Investment]
 *         heardFrom:
 *           type: string
 *           enum: [Social Media, Friend, Website]
 *         message:
 *           type: string
 */

/**
 * @swagger
 * /api/contact:
 *   post:
 *     summary: Create a contact entry
 *     description: Stores contact form data and sends a thank you email.
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Contact"
 *     responses:
 *       201:
 *         description: Contact created and email sent
 *       500:
 *         description: Internal Server Error
 */
router.post("/", createContactEntry);

/**
 * @swagger
 * /api/contact:
 *   get:
 *     summary: Retrieve all contact entries
 *     description: Returns a list of all contacts stored in the database.
 *     tags: [Contact]
 *     responses:
 *       200:
 *         description: A list of contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Contact"
 *       500:
 *         description: Internal Server Error
 */
router.get("/", getAllContacts);

module.exports = router;
