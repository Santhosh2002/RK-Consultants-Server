const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      // SEO-friendly URL
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: [
        "Construction",
        "Interior Design",
        "Real Estate Consulting",
        "Legal Services",
        "Business",
        "Other",
      ],
      required: true,
    },
    serviceType: {
      type: String,
      default: "Standard", // Example: "Premium", "Basic", "Custom", etc.
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    currency: {
      type: String,
      default: "INR",
    },
    images: [
      {
        type: String, // URL of images
        default: [],
      },
    ],
    status: {
      type: String,
      enum: ["Available", "Temporarily Unavailable", "Discontinued"],
      default: "Available",
    },
    subServices: [
      {
        name: { type: String, required: true },
        description: { type: String, default: "" },
        price: { type: Number, required: true, default: 0 },
        currency: { type: String, default: "INR" },
      },
    ],
  },
  { timestamps: true }
);

// Auto-generate a slug from the name
serviceSchema.pre("save", function (next) {
  if (this.name) {
    this.slug = this.name
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
  next();
});

const Service = mongoose.model("Service", serviceSchema);
module.exports = Service;
