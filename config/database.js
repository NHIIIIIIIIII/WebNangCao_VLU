import mongoose from "mongoose";

const databaseConfig = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/Lab3"); // Kết nối đến MongoDB
        console.log("Kết nối MongoDB thành công!");
    } catch (error) {
        console.error("Kết nối MongoDB thất bại:", error);
    }
};

databaseConfig();
export default databaseConfig;
