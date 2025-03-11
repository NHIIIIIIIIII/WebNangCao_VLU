import Cart from "../models/cart.js";  // Đảm bảo file models/cart.js có export default
import Product from "../models/product.js";  // Import model Product

// Lấy giỏ hàng
export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne().populate("products.productId"); // Lấy dữ liệu sản phẩm đầy đủ
        if (!cart) cart = { products: [] };
        res.render("cart", { cart });
    } catch (err) {
        console.error("Error retrieving cart:", err);
        res.status(500).send("Error retrieving cart");
    }
};

// Thêm sản phẩm vào giỏ hàng

export const addToCart = async (req, res) => {
    try {
        let cart = await Cart.findOne();
        if (!cart) cart = new Cart({ products: [] });

        const { productId } = req.body;
        const product = await Product.findById(productId);
        if (!product) return res.status(404).send("Product not found");

        const existingItem = cart.products.find(p => p.productId.toString() === productId);
        if (existingItem) existingItem.quantity += 1;
        else cart.products.push({ productId, quantity: 1 });

        await cart.save();
        res.redirect("/cart");
    } catch (err) {
        res.status(500).send("Error adding to cart");
    }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (req, res) => {
    try {
        let cart = await Cart.findOne();
        if (!cart) return res.redirect("/cart");

        const productId = req.params.id; // Lấy ID sản phẩm từ URL
        cart.products = cart.products.filter(p => p.productId.toString() !== productId);
        await cart.save();

        res.redirect("/cart"); // Chuyển hướng về trang giỏ hàng
    } catch (err) {
        console.error("Error removing from cart:", err);
        res.status(500).send("Error removing from cart");
    }
};

// Xóa toàn bộ giỏ hàng
export const clearCart = async (req, res) => {
    try {
        let cart = await Cart.findOne();
        if (cart) {
            cart.products = [];
            await cart.save();
        }
        res.redirect("/cart");
    } catch (err) {
        console.error("Error clearing cart:", err);
        res.status(500).send("Error clearing cart");
    }
};
