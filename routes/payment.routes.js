const {
  createOrders,
  verifyPayments,
  getAllPayments,
  getPaymentById,
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
/**
 * @swagger
 * /api/payment/list:
 *   get:
 *     summary: Get all payments
 *     description: Retrieves a list of all payment records from the database.
 *     tags: [Payments]
 *     responses:
 *       200:
 *         description: Payments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 payments:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/Payment"
 *       500:
 *         description: Internal Server Error
 */
router.get("/list", getAllPayments);

/**
 * @swagger
 * /api/payment/{id}:
 *   get:
 *     summary: Get payment by ID
 *     description: Retrieves a specific payment record by ID.
 *     tags: [Payments]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the payment to retrieve
 *     responses:
 *       200:
 *         description: Payment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 payment:
 *                   $ref: "#/components/schemas/Payment"
 *       404:
 *         description: Payment not found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", getPaymentById);
module.exports = router;
