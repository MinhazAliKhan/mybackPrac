const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// ===== Public =====
router.get("/", getProducts);
router.get("/:id", getProduct);

// ===== Admin Only =====
router.post("/", verifyToken, isAdmin, createProduct);
router.put("/:id", verifyToken, isAdmin, updateProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

module.exports = router;
