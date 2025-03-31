const Project = require("../model/project.model");

exports.createProject = async (req, res) => {
  try {
    const newProject = new Project(req.body); // Directly using req.body for input
    await newProject.save();
    res
      .status(201)
      .json({ message: "Project created successfully", project: newProject });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json({ projects });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project updated successfully", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.searchProjects = async (req, res) => {
  try {
    const {
      keyword,
      location,
      propertyType,
      minPrice,
      maxPrice,
      minSize,
      maxSize,
      buildYear,
      page = 1,
      limit = 10,
    } = req.query;

    const query = { visible: true };

    if (keyword && keyword !== "*") {
      query.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { landmark: { $regex: keyword, $options: "i" } },
        { nearby: { $elemMatch: { $regex: keyword, $options: "i" } } },
      ];
    }

    if (location) {
      query["location.city"] = { $regex: location, $options: "i" };
    }

    if (propertyType) {
      query.propertyType = propertyType;
    }

    if (minPrice || maxPrice || minSize || maxSize || buildYear) {
      query.variants = { $elemMatch: {} };

      if (minPrice)
        query.variants.$elemMatch.price = { $gte: parseInt(minPrice) };
      if (maxPrice) {
        query.variants.$elemMatch.price = {
          ...query.variants.$elemMatch.price,
          $lte: parseInt(maxPrice),
        };
      }

      if (minSize)
        query.variants.$elemMatch.carpetArea = { $regex: new RegExp(minSize) }; // Assuming carpetArea contains sq ft
      if (maxSize) {
        query.variants.$elemMatch.carpetArea = {
          ...query.variants.$elemMatch.carpetArea,
          $regex: new RegExp(maxSize),
        };
      }

      if (buildYear)
        query["createdAt"] = { $gte: new Date(`${buildYear}-01-01`) };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getProjectBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const project = await Project.findOne({ slug });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
