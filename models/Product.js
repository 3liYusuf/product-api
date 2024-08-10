import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const productSchema = new mongoose.Schema({
  ID: { type: Number, unique: true },
  revision: { type: Number }, // No default value, will be managed manually
  name: { type: String, required: true },
  description: { type: String, required: true },
  quantity: { type: Number, required: true },
  material_items: { type: Number, default: 0 },
  material_cost: { type: Number, default: 0 },
  waste_percentage: { type: Number, required: true },
  waste_amount: { type: Number },
  labour_percentage: { type: Number, required: true },
  labour_amount: { type: Number },
  equipment_cost: { type: Number, required: true },
  other_percentage: { type: Number, required: true },
  other_amount: { type: Number },
  margin_percentage: { type: Number, required: true },
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

// Use a unique counter field name to avoid conflicts
productSchema.plugin(AutoIncrement, { inc_field: "ID", start_seq: 1 });

// Increment revision
productSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.revision = 0;
  } else {
    if (this.isModified()) {
      this.revision = (this.revision || 0) + 1;
    }
  }
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;
