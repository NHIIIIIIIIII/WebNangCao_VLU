import Product from "../models/product.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render("products", { products });
    } catch (error) {
        res.status(500).send("Lỗi khi lấy danh sách sản phẩm");
    }
};

export const getProductDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Không tìm thấy sản phẩm");
        }
        res.render("productDetail", { product });
    } catch (error) {
        res.status(500).send("Lỗi server");
    }
};
