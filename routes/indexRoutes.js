import express from "express";
import Product from "../models/product.js";

const router = express.Router();

// Trang chủ
router.get("/", async (req, res) => {
    try {
        const products = await Product.find(); // Lấy tất cả sản phẩm
        res.render("index", { products }); // Truyền products vào EJS
    } catch (error) {
        res.status(500).send("Lỗi tải trang chủ!");
    }
});

export default router;
