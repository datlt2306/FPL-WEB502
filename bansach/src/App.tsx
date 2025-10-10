import { Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductAdd from "./components/ProductAdd";
import ProductEdit from "./components/ProductEdit";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="admin/products/add" element={<ProductAdd />} />
                <Route path="admin/products/edit/:id" element={<ProductEdit />} />
            </Routes>
        </>
    );
}

export default App;

/**
 * - Sử dụng Axios
 * - Tách services
 * - Hoàn thành chức năng xóa sản phẩm
 * - Router
 * - Sử form trong antd

 */
