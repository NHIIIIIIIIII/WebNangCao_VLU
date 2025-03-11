import mongoose from "mongoose";

// Định nghĩa Schema cho Product
const productSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  categories_id: [{ type: String, ref: "categories" }], 
  images: [{ type: String }],
  show: { type: Boolean, default: true },
});

// Tạo model cho Product
const Product = mongoose.model("products", productSchema); 

// Thêm Product
async function addProduct(_id, name, description, price, categories, images = []) {
  const product = new Product({_id, name, description, price, categories_id: categories, images });
  await product.save();
  console.log("Thêm sản phẩm:", product);
}


// Cập nhật Product
async function updateProduct(_id, newData) {
  const updated = await Product.findByIdAndUpdate(id, newData, { new: true });
  console.log("Cập nhật sản phẩm:", updated);
}

// Xóa Product
async function deleteProduct(_id) {
  await Product.findByIdAndDelete(id);
  console.log("Xóa sản phẩm thành công!");
}

// Lấy danh sách Products
async function getProducts() {
  const products = await Product.find().populate("categories_id");
  console.log("Danh sách sản phẩm:", products);
}

// Tìm kiếm Product theo tên
async function searchProductByName(name) {
  const products = await Product.find({ name: new RegExp(name, "i") }).populate("categories_id");
  console.log("Kết quả tìm kiếm:", products);
}

// Lấy sản phẩm theo Category
async function getProductsByCategory(categoryId) {
  const products = await Product.find({ categories_id: categoryId }).populate("categories_id");
  console.log("Sản phẩm theo danh mục:", products);
}

export { addProduct, updateProduct, deleteProduct, getProducts, searchProductByName, getProductsByCategory };
