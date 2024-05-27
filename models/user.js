import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    key: { type: Boolean, required: true },
    openTill: { type: Boolean, required: true },
    closeTill: { type: Boolean, required: true },
    openBar: { type: Boolean, required: true },
    openBar: { type: Boolean, required: true },
    timeOff: [timeOffSchema],
  },
  { timestamps: true }
);

const timeOffSchema = new Schema({});

const User = models.User || mongoose.model("User", userSchema);
export default User;
