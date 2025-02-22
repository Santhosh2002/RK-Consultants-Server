const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
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
    contact: {
      phone: { type: String, required: true },
      email: { type: String, default: "" },
    },
    images: [
      {
        type: String, // URL of image
        default: [],
      },
    ],
    video: {
      type: String, // Video tour URL
      default: "",
    },
    virtualTour: {
      type: String, // 3D Virtual tour link
      default: "",
    },
    brochure: {
      type: String, // URL of the downloadable brochure (PDF, DOC, etc.)
      default: "",
    },
    visible: {
      type: Boolean,
      default: true,
    },
    propertyType: {
      type: String,
      enum: ["Apartment", "Villa", "Office", "Land", "Shop", "Other"],
      default: "Apartment",
    },
    transactionType: {
      type: String,
      enum: ["Rent", "Sale"],
      default: "Rent",
    },
    furnishingStatus: {
      type: String,
      enum: ["Unfurnished", "Semi-Furnished", "Fully-Furnished"],
      default: "Unfurnished",
    },
    status: {
      type: String,
      enum: ["Available", "Sold", "Rented", "Not Disclosed"],
      default: "Available",
    },
    ownership: {
      type: String,
      default: "Not Disclosed",
    },
    landmark: {
      type: String,
      default: "",
    },
    nearby: {
      // Nearby key places like school, hospital, metro, etc.
      type: [String],
      default: [],
    },
    amenities: [
      {
        type: String,
        default: [],
      },
    ],
    parking: {
      type: String,
      default: "",
    },
    location: {
      // Geo-coordinates for map
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "" },
      latitude: { type: Number, default: null },
      longitude: { type: Number, default: null },
    },

    // 🔹 NEW: Multiple Property Variants Support
    variants: [
      {
        bhk: { type: String, required: true }, // Example: "2BHK", "3BHK"
        carpetArea: { type: String, required: true }, // Example: "1111 sq ft"
        builtUpArea: { type: String, required: true }, // Example: "1500 sq ft"
        facing: { type: String, default: "Not Specified" }, // Example: "East", "North"
        price: { type: Number, required: true }, // Example: 5000000 (for sale) or 20000 (for rent)
        currency: { type: String, default: "INR" },
        bedrooms: { type: Number, required: true },
        bathrooms: { type: Number, required: true },
        images: [
          {
            type: String, // URL of image
            default: [],
          },
        ],
        video: {
          type: String, // Video tour URL
          default: "",
        },
        balcony: { type: Number, default: 0 },
        floor: { type: String, default: "Ground Floor" },

        totalFloors: { type: String, default: "Not Specified" },
        availability: { type: Boolean, default: true }, // Available or Not
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Auto-generate a slug from the title
projectSchema.pre("save", function (next) {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  }
  next();
});

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
