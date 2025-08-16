const express = require("express");
const router = express.Router();
const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { verifyToken, isAdmin } = require("../middlewares/authMiddleware");

// ===== Public: Get All & Single =====
router.get("/", getCategories);
router.get("/:id", getCategory);

// ===== Admin Only =====
router.post("/", verifyToken, isAdmin, createCategory);
router.put("/:id", verifyToken, isAdmin, updateCategory);
router.delete("/:id", verifyToken, isAdmin, deleteCategory);

module.exports = router;
