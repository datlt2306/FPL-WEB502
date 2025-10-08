import { Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductAdd from "./components/ProductAdd";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<ProductList />} />
                <Route path="add" element={<ProductAdd />} />
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
