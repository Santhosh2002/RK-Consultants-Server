const Testimonial = require("../model/testimonials.model");

exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find();
    res.status(200).json({ testimonials });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json({ testimonial });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = new Testimonial(req.body);
    await testimonial.save();
    res
      .status(201)
      .json({ message: "Testimonial created successfully", testimonial });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res
      .status(200)
      .json({ message: "Testimonial updated successfully", testimonial });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    res.status(200).json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteAllTestimonials = async (req, res) => {
  try {
    await Testimonial.deleteMany();
    res.status(200).json({ message: "All testimonials deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
