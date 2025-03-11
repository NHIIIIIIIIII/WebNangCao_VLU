import mongoose from "mongoose";

const MONGO_URI = "mongodb://127.0.0.1:27017/Lab3"; 


async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Kết nối MongoDB thành công!");
  } catch (err) {
    console.error("Lỗi kết nối MongoDB:", err);
  }
}

export default connectDB;