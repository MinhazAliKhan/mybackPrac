const Product = require("../model/Product");
const createError = require("../utils/createError");


const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// ===== Get All Products =====
const getProducts = async (req, res, next) => {
  try {
    const { search, category, sortBy = "createdAt", order = "desc", page = 1, limit = 10, minPrice, maxPrice } = req.query;

    const query = {};

    if (search) query.name = { $regex: search, $options: "i" };
    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const sortObj = {};
    sortBy.split(",").forEach(field => {
      if (field) sortObj[field] = order === "asc" ? 1 : -1;
    });

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("category", "name")
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .lean();

    res.status(200).json({ success: true, total, page: Number(page), limit: Number(limit), products });
  } catch (err) {
    next(err);
  }
};

// ===== Get Single Product =====
const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate("category", "name");
    if (!product) return next(createError(404, "Product not found"));

    res.status(200).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// ===== Update Product =====
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate("category", "name");
    if (!product) return next(createError(404, "Product not found"));

    res.status(200).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// ===== Delete Product =====
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return next(createError(404, "Product not found"));

    res.status(200).json({ success: true, message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = { createProduct, getProducts, getProduct, updateProduct, deleteProduct };
