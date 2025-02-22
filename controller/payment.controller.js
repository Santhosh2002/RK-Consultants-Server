const Payment = require("../model/payment.model");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Razorpay Instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
exports.createOrders = async (req, res) => {
  try {
    const { amount, currency, clientId, services } = req.body;

    // Create Razorpay Order
    const options = {
      amount: amount * 100, // Convert to paise
      currency: currency || "INR",
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1,
    };

    const order = await razorpay.orders.create(options);

    // Save Payment Order in Database
    const newPayment = new Payment({
      clientId,
      amount,
      currency,
      orderId: order.id,
      status: "Pending",
    });

    await newPayment.save();
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Payment Order Creation Failed",
      error,
    });
  }
};

exports.verifyPayments = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
      req.body;

    // Generate HMAC to verify payment
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest("hex");

    if (generatedSignature === razorpay_signature) {
      // Update Payment Status
      const payment = await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: "Success", paymentId: razorpay_payment_id },
        { new: true }
      );

      // Update Client Payment History
      if (payment) {
        await Client.findByIdAndUpdate(payment.clientId, {
          $push: { payments: payment },
        });
      }

      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res
        .status(400)
        .json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error verifying payment", error });
  }
};
