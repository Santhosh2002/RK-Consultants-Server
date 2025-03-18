const Contact = require("../model/contact.model");
const Mailjet = require("node-mailjet");
const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

exports.createContactEntry = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      inquiryType,
      heardFrom,
      message,
    } = req.body;
    const contact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      inquiryType,
      heardFrom,
      message,
    });
    await contact.save();

    // Send confirmation email using Mailjet to both the submitter and your email
    const emailRequest = mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "saisanthoshgadde2002@gmail.com",
            Name: "RK Consultants",
          },
          To: [
            {
              Email: email, // Form submitter's email
              Name: `${firstName} ${lastName}`,
            },
            {
              Email: "saisanthoshgadde2002@gmail.com", // Your email for notifications
              Name: "Admin RK Consultants",
            },
          ],
          Subject: `Thank you for your inquiry about ${inquiryType}`,
          TextPart: `Hi ${firstName},\n\nThank you for reaching out to us regarding ${inquiryType}. We will get back to you shortly.\n\nMessage: ${message}`,
          HTMLPart: `
            <!DOCTYPE html>
            <html>
            <head>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        margin: 20px;
                        color: #333;
                    }
                    .container {
                        background-color: #f9f9f9;
                        padding: 20px;
                        border-radius: 5px;
                        border: 1px solid #dedede;
                    }
                    .header {
                        font-size: 22px;
                        color: #444;
                    }
                    .message {
                        margin-top: 20px;
                        line-height: 1.6;
                    }
                    .highlight {
                        color: #0056b3;
                        font-weight: bold;
                    }
                    .footer {
                        margin-top: 30px;
                        font-size: 12px;
                        text-align: center;
                        color: #888;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1 class="header">Hello ${firstName}, Thank You for Contacting Us!</h1>
                    <p class="message">
                        Your interest in our <span class="highlight">${inquiryType}</span> services is much appreciated. We're excited to discuss how we can assist you further and help meet your needs.
                    </p>
                    <p class="message">
                        Here’s a summary of your message to us:
                        <blockquote>"${message}"</blockquote>
                        Our team is already on it, and we aim to get back to you within one business day.
                    </p>
                    <p class="footer">
                        Warm regards,<br>
                        <strong>The Team at RK Consultants</strong><br>
                        <a href="https://www.rkconsultants.com" style="color: #0056b3;">Visit our Website</a>
                    </p>
                </div>
            </body>
            </html>
            `,
        },
      ],
    });

    emailRequest
      .then((result) => {
        console.log(result.body);
        res
          .status(201)
          .json({ message: "Contact saved and email sent successfully!" });
      })
      .catch((err) => {
        console.error(`Mailjet Error: ${err.statusCode}`);
        throw err; // Rethrow to handle in outer catch
      });
  } catch (error) {
    console.error(`Failed to save contact and send email: ${error}`);
    res.status(500).json({
      error: "Failed to process your request",
      details: error.message,
    });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (error) {
    console.error(`Error fetching contacts: ${error.message}`);
    res
      .status(500)
      .json({ error: "Failed to fetch contacts", details: error.message });
  }
};
