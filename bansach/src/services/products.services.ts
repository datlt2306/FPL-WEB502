import config from "../config/api";
import type { IProduct } from "../interfaces/IProduct";

const getAll = async () => {
    const response = await config.get("/books");
    if (response.status !== 200) {
        throw new Error("Không thể lấy danh sách sách");
    }
    return response.data;
}
const remove = async (id: number) => {
    const response = await config.delete(`/books/${id}`);
    if (response.status !== 200) {
        throw new Error("Không thể xóa sản phẩm");
    }
    return {
        success: true
    };
}
const add = async (product: IProduct) => {
    const response = await config.post("/books", product);
    if (response.status !== 201) {
        throw new Error("Không thể thêm sách");
    }
    return response.data;
}
export { getAll, remove, add };
