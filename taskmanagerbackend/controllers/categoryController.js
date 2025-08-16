const Fuse = require("fuse.js");
const Category = require("../model/Category");
const createError = require("../utils/createError");

// ===== Create Category =====
const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return next(createError(400, "Category name required"));

    const exists = await Category.findOne({ name });
    if (exists) return next(createError(400, "Category already exists"));

    const category = new Category({ name, description });
    await category.save();

    res.status(201).json({ success: true, category });
  } catch (err) {
    next(err);
  }
};

// ===== Get All Categories (with search, sort, pagination) =====
const getCategories = async (req, res, next) => {
  try {
    const { search,description, sortBy = "createdAt", order = "desc", page = 1, limit = 10 } = req.query;

    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if(description) query.description={$regex:description,$options:"i"}
    const sortObj = {};
    sortBy.split(",").forEach(field => {
      if (field) sortObj[field] = order === "asc" ? 1 : -1;
    });
    const total = await Category.countDocuments(query);

    const categories = await Category.find(query)
      .sort(sortObj)
    //   .sort({ [sortBy]: order === "asc" ? 1 : -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit)).lean();
      

    res.status(200).json({ success: true, total, page: Number(page), limit: Number(limit), categories });
  } catch (err) {
    next(err);
  }
};

// ===== Get Single Category =====
const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return next(createError(404, "Category not found"));

    res.status(200).json({ success: true, category });
  } catch (err) {
    next(err);
  }
};

// ===== Update Category =====
const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return next(createError(404, "Category not found"));

    res.status(200).json({ success: true, category });
  } catch (err) {
    next(err);
  }
};

// ===== Delete Category =====
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return next(createError(404, "Category not found"));

    res.status(200).json({ success: true, message: "Category deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createCategory, getCategories, getCategory, updateCategory, deleteCategory };
