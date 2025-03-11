import express from "express";
import { getCart, addToCart, removeFromCart, clearCart } from "../controllers/cartController.js";

const router = express.Router();

// Xem giỏ hàng
router.get("/", getCart);

// Thêm sản phẩm vào giỏ hàng
router.post("/add", addToCart);

// Xóa sản phẩm khỏi giỏ hàng
router.post("/remove/:id", removeFromCart);

// Xóa toàn bộ giỏ hàng
router.post("/clear", clearCart);

export default router;