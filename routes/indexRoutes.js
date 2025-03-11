import express from "express";
import { getAllProducts } from "../controllers/productController.js";

const router = express.Router();

// Route trang chủ (nếu muốn hiển thị danh sách sản phẩm ở đây)
router.get("/", getAllProducts);

export default router;