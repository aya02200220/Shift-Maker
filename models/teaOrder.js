import mongoose, { Schema, models } from "mongoose";

// Order Detail Schema
const orderDetailSchema = new Schema({
  index: { type: Number, required: true },
  teaName: { type: String, required: true },
  unopened: { type: Number, required: true },
  opened: { type: Number, required: true },
  tin: { type: Number, required: true },
  order: { type: Number, required: true },
});

// Order Schema
const teaOrderSchema = new Schema(
  {
    orderDate: { type: Date, default: Date.now },
    orderDetails: [orderDetailSchema],
  },
  { timestamps: true }
);

// Create the model if it does not exist
const TeaOrder = models.TeaOrder || mongoose.model("TeaOrder", teaOrderSchema);

// Exporting the model
export { TeaOrder };
