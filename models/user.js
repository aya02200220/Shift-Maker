import mongoose, { Schema, models } from "mongoose";

const timeOffSchema = new Schema({
  dayOfWeek: { type: String, required: true }, // 曜日 (e.g., "Monday", "Tuesday", etc.)
  startTime: { type: String, required: true }, // 開始時間 (e.g., "09:00")
  endTime: { type: String, required: true }, // 終了時間 (e.g., "17:00")
});

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    key: { type: Boolean, required: true },
    openTill: { type: Boolean, required: true },
    closeTill: { type: Boolean, required: true },
    openBar: { type: Boolean, required: true },
    closeBar: { type: Boolean, required: true },
    note: { type: String, required: false },
    timeOff: [timeOffSchema],
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
