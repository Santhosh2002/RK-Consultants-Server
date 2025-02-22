const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    companyName: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    industry: {
      type: String,
      enum: [
        "Real Estate",
        "Construction",
        "Interior Design",
        "Legal Services",
        "Other",
      ],
      default: "Real Estate",
    },
    clientType: {
      type: String,
      enum: ["Individual", "Business"],
      default: "Individual",
    },
    image: {
      type: String, // URL for the profile or logo
      default: "",
    },
    location: {
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "India" },
    },
    socialLinks: {
      linkedin: { type: String, default: "" },
      twitter: { type: String, default: "" },
      facebook: { type: String, default: "" },
    },
    listings: [
      {
        listingId: { type: String, required: true }, // ID of the listing
        title: { type: String, required: true },
        slug: { type: String, required: true },
        description: { type: String, default: "" },
      },
    ],
    projects: [
      {
        projectId: { type: String, required: true }, // ID of the project
        title: { type: String, required: true },
        slug: { type: String, required: true },
        description: { type: String, default: "" },
      },
    ],
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    visible: {
      type: Boolean,
      default: true, // Whether to show on the website
    },
    payments: [
      {
        paymentId: { type: String, required: true }, // Razorpay payment ID
        orderId: { type: String, required: true }, // Razorpay order ID
        serviceId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Service",
          required: true,
        },
        amount: { type: Number, required: true },
        currency: { type: String, default: "INR" },
        status: {
          type: String,
          enum: ["Success", "Failed", "Pending"],
          default: "Pending",
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
