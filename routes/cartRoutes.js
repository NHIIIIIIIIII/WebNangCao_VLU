import express from "express";
import { getCart, addToCart, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

// Xem giỏ hàng
router.get("/", getCart);

// Thêm sản phẩm vào giỏ hàng (hỗ trợ cả GET & POST)
router.get("/add/:id", addToCart);
router.post("/add/:id", addToCart);

// Xóa sản phẩm khỏi giỏ hàng
router.post("/remove/:id", removeFromCart);

export default router;
