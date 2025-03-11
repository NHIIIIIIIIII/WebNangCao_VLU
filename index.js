import connectDB from "./database.js";
import { addCategory, updateCategory, deleteCategory, getCategories } from "./category.js";
import { addProduct, updateProduct, deleteProduct, getProducts, searchProductByName, getProductsByCategory } from "./product.js";

await connectDB();

// ===== Test chức năng =====
// Thêm danh mục


// await addCategory("1223","Điện tử");
// await addCategory("12454","Điện thoại");
// await addCategory("4821","Laptop");

// await addProduct("Phone A35", "Điện thoại cao cấp", 25000000, "1223", ["image1.jpg"]);

// await updateProduct("iPhone 155", { price: 23000000, images: ["iphone15_new.jpg"] });

// // Lấy danh sách sản phẩm
// await getProducts();


// await updateCategory("4821", "Laptop mới", "1223");

// await deleteCategory("4821");

// await getCategories();

// await getProducts();

// await searchProductByName("Điện thoại cao cấp1");

await getProductsByCategory("1223");

await addProduct(
    "PhoneX100", 
    "Điện thoại thông minh", 
    "Điện thoại mới nhất với camera 108MP", 
    15000000, 
    "1223", 
    ["image1.jpg", "image2.jpg"]
  );





// await deleteCategory("4821");




// Lấy danh sách danh mục
// await getCategories();


// Thoát chương trình
console.log("Chương trình đã hoàn thành! Đang thoát...");
process.exit(0);