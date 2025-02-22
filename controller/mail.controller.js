const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY); // Ensure proper naming of API key variable

exports.sendMail = async (req, res) => {
  try {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
      return res
        .status(400)
        .json({ error: "All fields (email, subject, message) are required" });
    }

    // Basic Email Format Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const msg = {
      to: email,
      from: "info@rkrealco.com",
      subject,
      text: message,
      html: `<p>${message}</p>`, // Prevents raw HTML injection
    };

    await sgMail.send(msg);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
};
