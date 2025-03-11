import mongoose from "mongoose";

// Định nghĩa Schema cho Category
const categorySchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Dùng string thay vì ObjectId
  name: { type: String, required: true },
  parent_category_id: { type: String, ref: "categories", default: null }, // Đồng bộ kiểu dữ liệu
});

// Tạo model cho Category
const Category = mongoose.model("categories", categorySchema);

// Thêm Category
async function addCategory(_id, name, parent_category_id = null) {
  try {
    const category = new Category({ _id, name, parent_category_id });
    await category.save();
    console.log("Thêm category:", category);
  } catch (error) {
    console.error("Lỗi khi thêm category:", error);
  }
}

// Cập nhật Category
async function updateCategory(_id, newName, newParent = null) {
  try {
    const updated = await Category.findByIdAndUpdate(
      _id,
      { name: newName, parent_category_id: newParent },
      { new: true }
    );
    console.log("Cập nhật category:", updated);
  } catch (error) {
    console.error("Lỗi khi cập nhật category:", error);
  }
}

// Xóa Category
async function deleteCategory(_id) {
  try {
    const hasProducts = await mongoose.model("products").exists({ categories_id: _id });
    const hasSubCategories = await Category.exists({ parent_category_id: _id });

    if (hasProducts || hasSubCategories) {
      console.log("Không thể xóa category có sản phẩm hoặc category con!");
      return;
    }

    await Category.findByIdAndDelete(_id);
    console.log("Xóa category thành công!");
  } catch (error) {
    console.error("Lỗi khi xóa category:", error);
  }
}

// Lấy danh sách Categories (bao gồm category con)
async function getCategories() {
  try {
    const categories = await Category.find().lean();

    // Định dạng dữ liệu để hiển thị category con
    const categoryMap = {};
    categories.forEach((cat) => (categoryMap[cat._id] = { ...cat, subCategories: [] }));

    // Gắn category con vào danh mục cha
    categories.forEach((cat) => {
      if (cat.parent_category_id && categoryMap[cat.parent_category_id]) {
        categoryMap[cat.parent_category_id].subCategories.push(categoryMap[cat._id]);
      }
    });

    // Chỉ lấy danh mục cha (loại bỏ danh mục con ra khỏi danh sách chính)
    const rootCategories = Object.values(categoryMap).filter((cat) => !cat.parent_category_id);

    console.log("Danh sách categories:", rootCategories);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách categories:", error);
  }
}

export { addCategory, updateCategory, deleteCategory, getCategories };
