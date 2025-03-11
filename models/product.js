import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: [true, "Tên sản phẩm không được để trống"], 
            trim: true 
        },
        price: { 
            type: Number, 
            required: [true, "Giá sản phẩm không được để trống"], 
            min: [0, "Giá không thể nhỏ hơn 0"] 
        },
        image: { 
            type: String, 
            required: [true, "Ảnh sản phẩm là bắt buộc"], 
            default: "/images/default.jpg" 
        },
        description: { 
            type: String, 
            required: [true, "Mô tả sản phẩm không được để trống"], 
            trim: true 
        },
    },
    { timestamps: true } // Tự động thêm createdAt & updatedAt
);

const Product = mongoose.model("Product", productSchema);
export default Product;
