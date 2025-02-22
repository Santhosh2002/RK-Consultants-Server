const {
  createOrders,
  verifyPayments,
} = require("../controller/payment.controller");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: API endpoints for managing payments
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       $ref: "#/components/schemas/Payment"
 */

/**
 * @swagger
 * /api/payment/create-order:
 *   post:
 *     summary: Create a new payment order
 *     description: Creates a payment order using Razorpay and stores it in the database.
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Payment"
 *     responses:
 *       201:
 *         description: Payment order created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 order:
 *                   $ref: "#/components/schemas/Payment"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Payment Order Creation Failed"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post("/create-order", createOrders);

/**
 * @swagger
 * /api/payment/verify:
 *   post:
 *     summary: Verify Razorpay Payment
 *     description: Verifies the Razorpay payment using HMAC signature and updates the payment status.
 *     tags: [Payments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - razorpay_payment_id
 *               - razorpay_order_id
 *               - razorpay_signature
 *             properties:
 *               razorpay_payment_id:
 *                 type: string
 *                 example: "pay_29QQoUBi66xm2f"
 *               razorpay_order_id:
 *                 type: string
 *                 example: "order_9A33XWu170gUtm"
 *               razorpay_signature:
 *                 type: string
 *                 example: "e5c245d7a176b4861985b0478d0df35db9c2a2a5b7dd4a5a"
 *     responses:
 *       200:
 *         description: Payment verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Payment verified successfully"
 *       400:
 *         description: Payment verification failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Payment verification failed"
 *       500:
 *         description: Server error occurred during verification
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Error verifying payment"
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

router.post("/verify", verifyPayments);

module.exports = router;
