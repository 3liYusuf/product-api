import Product from "../models/Product.js";
import ProductMaterial from "../models/ProductMaterial.js";

// Get product materials
export const getProductMat = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOne({ ID: parseInt(productId) });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const materials = await ProductMaterial.find({
      product_id: parseInt(productId),
      delete: false,
    });
    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving product materials",
      error: error.message,
    });
    next(error);
  }
};

// Add product material
export const addProductMat = async (req, res, next) => {
  try {
    const { productId } = req.params; // Get productId from params
    const { description, quantity, rate } = req.body;

    // Check if the product exists
    const product = await Product.findOne({ ID: productId });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const amount = quantity * rate;

    const newMaterial = new ProductMaterial({
      product_id: productId, // Use productId from params
      description,
      quantity,
      rate,
      amount,
      //   createdBy: req.user.email, // Assuming user email is available in req.user
    });

    await newMaterial.save();

    res.status(201).json(newMaterial);
  } catch (error) {
    console.error("Error in addProductMat:", error); // Log the error for debugging
    res.status(500).json({
      message: "Error creating product material",
      error: error.message,
    });
    next(error);
  }
};

// Update product material
export const updateProductMat = async (req, res, next) => {
  try {
    const materialID = req.params.materialID;
    const { description, quantity, rate } = req.body;
    const material = await ProductMaterial.findOne({ materialID: materialID });
    if (!material) {
      return res.status(404).json({ message: "Product material not found" });
    }

    const product = await Product.findOne({ ID: material.product_id });
    if (!product) {
      return res.status(404).json({ message: "Associated product not found" });
    }

    material.description = description;
    material.quantity = quantity;
    material.rate = rate;
    material.amount = quantity * rate;
    // material.updatedBy = req.user.email;
    material.updatedAt = Date.now();
    material.revision += 1; // Increment revision on update

    await material.save();

    res.status(200).json(material);
  } catch (error) {
    res.status(500).json({
      message: "Error updating product material",
      error: error.message,
    });
    next(error);
  }
};

// Delete product material
export const deleteProductMat = async (req, res, next) => {
  try {
    const materialID = req.params.materialID;

    const material = await ProductMaterial.findOne({ materialID: materialID });
    if (!material) {
      return res.status(404).json({ message: "Product material not found" });
    }

    const product = await Product.findOne({ ID: material.product_id });
    if (!product) {
      return res.status(404).json({ message: "Associated product not found" });
    }

    material.delete = true;
    // material.deletedBy = req.user.email;
    material.deletedAt = Date.now();

    await material.save();

    res.status(200).json({ message: "Product material deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting product material",
      error: error.message,
    });
    next(error);
  }
};
