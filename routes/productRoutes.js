import express from 'express';
import Product from '../models/product.js';
// import { getProducts } from "../controllers/productController.js"; // Import đúng controller


const router = express.Router();

// Route lấy danh sách sản phẩm
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

// Route lấy chi tiết sản phẩm theo ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.render('productDetail', { product });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

export default router;
