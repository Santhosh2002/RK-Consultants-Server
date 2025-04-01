const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    author: {
      name: {
        type: String,
        required: true,
      },
      location: {
        country: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
      },
      avatarUrl: {
        type: String, // Optional field to store avatar URL if needed
        default: "",
      },
    },
    showMoreLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Testimonial = mongoose.model("Testimonial", testimonialSchema);
module.exports = Testimonial;
