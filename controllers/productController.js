import Product from "../models/product.js";

// Hiển thị danh sách sản phẩm
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.render("productList", { products });
    } catch (error) {
        res.status(500).send("Lỗi khi lấy danh sách sản phẩm");
    }
};

// Hiển thị form thêm sản phẩm
export const showNewProductForm = (req, res) => {
    res.render("addProduct");
};

// Xử lý thêm sản phẩm
export const addNewProduct = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const image = req.file ? "/images/" + req.file.filename : "";

        if (!name || !price || !description) {
            return res.status(400).send("Vui lòng điền đầy đủ thông tin!");
        }

        const newProduct = new Product({ name, price: parseFloat(price), image, description });
        await newProduct.save();

        res.redirect("/products");
    } catch (err) {
        console.error("Lỗi khi thêm sản phẩm:", err);
        res.status(500).send("Lỗi khi thêm sản phẩm");
    }
};

// Hiển thị trang chi tiết sản phẩm
export const getProductDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).render("productDetail", { product: null });
        }
        res.render("productDetail", { product });
    } catch (error) {
        console.error("Lỗi server:", error);
        res.status(500).send("Lỗi server");
    }
};

// Xóa sản phẩm
export const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findByIdAndDelete(productId);

        if (!product) {
            return res.status(404).send("Sản phẩm không tồn tại!");
        }

        res.redirect("/products");
    } catch (error) {
        console.error("Lỗi khi xóa sản phẩm:", error);
        res.status(500).send("Lỗi khi xóa sản phẩm");
    }
};

export default {
    getAllProducts,
    showNewProductForm,
    addNewProduct,
    getProductDetail,
    deleteProduct,
};