import mongoose, { Schema, models } from "mongoose";

// Tea Schema
const teaSchema = new Schema({
  name: { type: String, required: true },
  unopened: { type: Number, required: false },
  opened: { type: Number, required: false },
  tin: { type: Number, required: true },
  order: { type: Number, required: false },
});

// Order Schema
const teaOrderSchema = new Schema(
  {
    orderDate: { type: Date, default: Date.now },
    teas: [teaSchema],
  },
  { timestamps: true }
);

// Creating models
const Tea = models.Tea || mongoose.model("Tea", teaSchema);
const TeaOrder = models.Order || mongoose.model("Order", teaOrderSchema);

export { Tea, TeaOrder };
