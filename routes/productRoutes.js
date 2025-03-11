import express from "express";
import multer from "multer";
import path from "path";
import { getAllProducts, showNewProductForm, addNewProduct, getProductDetail, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

// Cấu hình multer để lưu ảnh
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/images/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Route lấy danh sách sản phẩm
router.get("/", getAllProducts);

// Route hiển thị form thêm sản phẩm
router.get("/add", showNewProductForm);

// Route xử lý thêm sản phẩm
router.post("/add", upload.single("image"), addNewProduct);

// Route lấy chi tiết sản phẩm
router.get("/:id", getProductDetail);

// Route xóa sản phẩm
router.post("/delete/:id", deleteProduct);

export default router;