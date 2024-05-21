// import mongoose, { Schema, models } from "mongoose";

// // Order Detail Schema
// const orderDetailSchema = new Schema({
//   index: { type: Number, required: true },
//   displayName: { type: String, required: true },
//   orderName: { type: String, required: true },
//   itemName: { type: String, required: true },
//   itemCode: { type: String, required: true },
//   codeRequired: { type: Boolean, required: true },
//   minimum: { type: String, required: true },
//   stock: { type: Number, required: true },
//   shelfMinimum: { type: Number, required: true },
//   shelf: { type: Number, required: true },
//   price: { type: Number, required: true },
//   order: { type: Number, required: true },
// });

// // Order Schema
// const cupOrderSchema = new Schema(
//   {
//     orderDate: { type: Date, default: Date.now },
//     orderDetails: [orderDetailSchema],
//   },
//   { timestamps: true }
// );

// const CupOrder = models.CupOrder || mongoose.model("CupOrder", cupOrderSchema);

// export { CupOrder };
