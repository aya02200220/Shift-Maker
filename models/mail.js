import mongoose, { Schema, models } from "mongoose";

const mailSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Mail = models.Mail || mongoose.model("Mail", mailSchema);
export default Mail;
