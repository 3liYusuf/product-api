import Product from "../models/Product.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ delete: false });

    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving products", error: error.message });
    next(error);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("Searching for product with ID:", id);

    // Find product by 'ID' field instead of MongoDB's '_id'
    const product = await Product.findOne({ ID: id }).populate(
      "material_items"
    );
    if (!product || product.delete) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving product", error: error.message });
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const {
      name,
      description = "",
      quantity = 1,
      material_items = 0,
      material_cost = 0,
      waste_percentage = 0,
      labour_percentage = 0,
      equipment_cost = 0,
      other_percentage = 0,
      margin_percentage = 0,
    } = req.body;

    // Calculate derived fields
    const waste_amount = ((waste_percentage / 100) * material_cost).toFixed(1);
    const labour_amount = (
      (labour_percentage / 100) *
      (material_cost + parseFloat(waste_amount))
    ).toFixed(1);
    const other_amount = (
      (other_percentage / 100) *
      (equipment_cost +
        parseFloat(labour_amount) +
        material_cost +
        parseFloat(waste_amount))
    ).toFixed(1);
    const margin_amount = (
      (margin_percentage / 100) *
      (parseFloat(other_amount) +
        equipment_cost +
        parseFloat(labour_amount) +
        material_cost +
        parseFloat(waste_amount))
    ).toFixed(1);
    const sub_total = (
      parseFloat(margin_amount) +
      parseFloat(other_amount) +
      equipment_cost +
      parseFloat(labour_amount) +
      material_cost +
      parseFloat(waste_amount)
    ).toFixed(1);
    const amount = (quantity * parseFloat(sub_total)).toFixed(1);

    const newProduct = new Product({
      name,
      description,
      quantity,
      material_items,
      material_cost,
      waste_percentage,
      waste_amount,
      labour_percentage,
      labour_amount,
      equipment_cost,
      other_percentage,
      other_amount,
      margin_percentage,
      margin_amount,
      sub_total,
      amount,
      //   createdBy: req.user.email, // Assuming user email is available in req.user
    });

    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating product", error: error.message });
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Extract required fields from request body
    const {
      name,
      description = "",
      quantity = 1,
      material_items = 0,
      material_cost = 0,
      waste_percentage = 0,
      labour_percentage = 0,
      equipment_cost = 0,
      other_percentage = 0,
      margin_percentage = 0,
    } = req.body;

    // Calculate derived fields
    const waste_amount = ((waste_percentage / 100) * material_cost).toFixed(1);
    const labour_amount = (
      (labour_percentage / 100) *
      (material_cost + parseFloat(waste_amount))
    ).toFixed(1);
    const other_amount = (
      (other_percentage / 100) *
      (equipment_cost +
        parseFloat(labour_amount) +
        material_cost +
        parseFloat(waste_amount))
    ).toFixed(1);
    const margin_amount = (
      (margin_percentage / 100) *
      (parseFloat(other_amount) +
        equipment_cost +
        parseFloat(labour_amount) +
        material_cost +
        parseFloat(waste_amount))
    ).toFixed(1);
    const sub_total = (
      parseFloat(margin_amount) +
      parseFloat(other_amount) +
      equipment_cost +
      parseFloat(labour_amount) +
      material_cost +
      parseFloat(waste_amount)
    ).toFixed(1);
    const amount = (quantity * parseFloat(sub_total)).toFixed(1);

    // Find and update the product
    const updatedProduct = await Product.findOneAndUpdate(
      { ID: id }, // Search by custom ID field
      {
        name,
        description,
        quantity,
        material_items,
        material_cost,
        waste_percentage,
        waste_amount,
        labour_percentage,
        labour_amount,
        equipment_cost,
        other_percentage,
        other_amount,
        margin_percentage,
        margin_amount,
        sub_total,
        amount,
        // updatedBy: req.user.email, // Assuming user email is available in req.user
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!updatedProduct || updatedProduct.delete) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating product", error: error.message });
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log("id:", id);
    // Find product by 'ID' field instead of MongoDB's '_id'
    const product = await Product.findOne({ ID: id });
    if (!product || product.delete) {
      return res.status(404).json({ message: "Product not found" });
    }

    product.delete = true;
    //   product.deletedBy = req.user.email;
    product.deletedAt = Date.now();

    await product.save();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting product", error: error.message });
    next(error);
  }
};
