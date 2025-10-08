import config from "../config/api";

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
export { getAll, remove };
