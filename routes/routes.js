import express from "express";
import { login } from "../controllers/auth.controller.js";
import {
  addProductMat,
  deleteProductMat,
  getProductMat,
  updateProductMat,
} from "../controllers/product-material.controller.js";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Login
router.post("/login", login);

// Product Routes
router.get("/products", getProducts); // Get all products
router.get("/product/:id", getProduct); // Get a specific product by ID
router.post("/product", addProduct); // Create a new product
router.put("/product/:id", updateProduct); // Update a product by ID
router.delete("/product/:id", deleteProduct); // Delete a product by ID

// Product Material Routes
router.get("/product-material/:productId", getProductMat); // Get all materials for a specific product
router.post("/product-material/:productId", addProductMat); // Add a new material to a specific product
router.put("/product-material/:materialID", updateProductMat); // Update a specific material by ID
router.delete("/product-material/:materialID", deleteProductMat); // Delete a specific material by ID

export default router;
