import Cart from "../models/cart.js";
import Product from "../models/product.js";

// Lấy giỏ hàng
export const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne().populate("products.productId");
        if (!cart) {
            cart = new Cart({ products: [] });
            await cart.save();
        }
        res.render("cart", { cart });
    } catch (err) {
        console.error("Error retrieving cart:", err);
        res.status(500).send("Error retrieving cart");
    }
};

// Thêm sản phẩm vào giỏ hàng
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        if (!productId || productId.trim() === "") {
            return res.status(400).send("Thiếu productId!");
        }

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).send("Sản phẩm không tồn tại!");
        }

        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ products: [] });
        }

        const existingItem = cart.products.find(p => p.productId.toString() === productId);
        if (existingItem) {
            existingItem.quantity += parseInt(quantity) || 1;
        } else {
            cart.products.push({ productId, quantity: parseInt(quantity) || 1 });
        }

        await cart.save();
        res.redirect("/cart");
    } catch (err) {
        console.error("Error adding to cart:", err);
        res.status(500).send("Error adding to cart");
    }
};

// Xóa sản phẩm khỏi giỏ hàng
export const removeFromCart = async (req, res) => {
    try {
        const cart = await Cart.findOne();
        if (!cart) {
            return res.redirect("/cart");
        }

        const productId = req.params.id;
        if (!productId) {
            return res.status(400).send("Thiếu productId để xóa!");
        }

        cart.products = cart.products.filter(p => p.productId.toString() !== productId);
        await cart.save();

        res.redirect("/cart");
    } catch (err) {
        console.error("Error removing from cart:", err);
        res.status(500).send("Error removing from cart");
    }
};

// Xóa toàn bộ giỏ hàng
export const clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne();
        if (!cart) {
            return res.redirect("/cart"); // Nếu giỏ hàng không tồn tại, không cần làm gì
        }

        cart.products = [];
        await cart.save();
        res.redirect("/cart");
    } catch (err) {
        console.error("Error clearing cart:", err);
        res.status(500).send("Error clearing cart");
    }
};