import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import databaseConfig from "./config/database.js";
import cartRoutes from "./routes/cartRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import indexRoutes from "./routes/indexRoutes.js";

const app = express();
const PORT = 3000;

// Kết nối cơ sở dữ liệu MongoDB
databaseConfig();

// Cấu hình đường dẫn
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cấu hình view engine EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("public/uploads"));
app.use(express.static(path.join(__dirname, "public")));

// Sử dụng các tuyến đường
app.use("/", indexRoutes);
app.use("/cart", cartRoutes);
app.use("/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server đang chạy tại: http://localhost:${PORT}`);
});