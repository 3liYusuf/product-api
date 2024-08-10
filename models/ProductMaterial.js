import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const productMaterialSchema = new mongoose.Schema({
  materialID: { type: Number, unique: true },
  product_id: { type: Number, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  rate: { type: Number, required: true },
  amount: { type: Number },
  createdBy: { type: String },
  updatedBy: { type: String },
  deletedBy: { type: String },
  delete: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  deletedAt: { type: Date },
});

// Use a unique counter field name to avoid conflicts
productMaterialSchema.plugin(AutoIncrement, {
  inc_field: "materialID",
  start_seq: 1,
});

const ProductMaterial = mongoose.model(
  "ProductMaterial",
  productMaterialSchema
);

export default ProductMaterial;
