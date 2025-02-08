const { sendMail } = require("../controller/mail.controller");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Mail
 *   description: API endpoint for sending emails
 */

/**
 * @swagger
 * /api/mail/send:
 *   post:
 *     summary: Send an email
 *     description: Sends an email using the configured mail service.
 *     tags: [Mail]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - subject
 *               - message
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *                 example: "recipient@example.com"
 *               subject:
 *                 type: string
 *                 example: "Welcome to Our Service"
 *               message:
 *                 type: string
 *                 example: "Hello, thank you for signing up!"
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email sent successfully"
 *       400:
 *         description: Bad Request - Missing required fields
 *       500:
 *         description: Internal Server Error
 */
router.post("/send", sendMail);

module.exports = router;
