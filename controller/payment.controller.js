const Payment = require("../model/payment.model");
const Client = require("../model/client.model"); // Ensure Client model is required
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Razorpay Order
exports.createOrders = async (req, res) => {
  try {
    const { amount, clientId } = req.body;

    if (!amount || !clientId) {
      return res
        .status(400)
        .json({ success: false, message: "Amount and Client ID are required" });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `receipt_${(await Payment.countDocuments()) + 1}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    // Save Payment Order in Database
    const newPayment = await new Payment({
      clientId,
      amount,
      currency: "INR",
      orderId: order.id,
      status: "Pending",
    }).save();

    res.status(201).json({ success: true, order, paymentId: newPayment._id });
  } catch (error) {
    console.error(`Error creating payment order: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Payment Order Creation Failed",
      error: error.message,
    });
  }
};

// ✅ Verify Razorpay Payment
exports.verifyPayments = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid payment details" });
    }

    // Generate HMAC to verify payment
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }

    // Update Payment Status
    const payment = await Payment.findOneAndUpdate(
      { orderId: razorpay_order_id },
      { status: "Success", paymentId: razorpay_payment_id },
      { new: true }
    );

    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment record not found" });
    }

    // Update Client Payment History
    await Client.findByIdAndUpdate(payment.clientId, {
      $push: { payments: payment._id },
    });

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    console.error(`Error verifying payment: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: error.message,
    });
  }
};
