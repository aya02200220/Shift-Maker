import mongoose from "mongoose";

export const connectMongoDB = async () => {
  // Mongooseのコネクション状態を確認
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB ---------------------");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB ---------------------");
  } catch (error) {
    console.log("--------------------- Error connecting to database: ", error);
  }
};
