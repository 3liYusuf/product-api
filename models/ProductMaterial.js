const mongoose = require("mongoose");

const productMaterialSchema = new mongoose.Schema({
  revision: { type: Number, default: 0 },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  description: { type: String },
  quantity: { type: Number },
  rate: { type: Number },
  amount: { type: Number },
  delete: { type: Boolean, default: false },
  createdBy: { type: String },
  updatedBy: { type: String },
  deletedBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
});

const ProductMaterial = mongoose.model(
  "ProductMaterial",
  productMaterialSchema
);
export default ProductMaterial;
