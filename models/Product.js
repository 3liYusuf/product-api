const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  revision: { type: Number, default: 0 },
  name: { type: String, required: true },
  description: { type: String },
  quantity: { type: Number },
  material_items: { type: Number, default: 0 },
  material_cost: { type: Number, default: 0 },
  waste_percentage: { type: Number },
  waste_amount: { type: Number },
  labour_percentage: { type: Number },
  labour_amount: { type: Number },
  equipment_cost: { type: Number },
  other_percentage: { type: Number },
  other_amount: { type: Number },
  margin_percentage: { type: Number },
  margin_amount: { type: Number },
  sub_total: { type: Number },
  amount: { type: Number },
  delete: { type: Boolean, default: false },
  createdBy: { type: String },
  updatedBy: { type: String },
  deletedBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
