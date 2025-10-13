/* eslint-disable @typescript-eslint/no-explicit-any */
import config from "../config/api";

const getAll = async () => {
    const response = await config.get("/books");
    if (response.status !== 200) {
        throw new Error("Không thể lấy danh sách sách");
    }
    return response.data;
}
const getById = async (resource: string, id: number | string) => {
    const response = await config.get(`/${resource}/${id}`);
    if (response.status !== 200) {
        throw new Error("Không thể lấy sách theo ID");
    }
    return response.data;
}
const remove = async (resource: string, id: number) => {
    const response = await config.delete(`/${resource}/${id}`);
    if (response.status !== 200) {
        throw new Error("Không thể xóa sản phẩm");
    }
    return {
        success: true
    };
}
const add = async (resource: string, payload: any) => {
    const response = await config.post(`/${resource}`, payload);
    if (response.status !== 201) {
        throw new Error("Không thể thêm sách");
    }
    return response.data;
}
const update = async (resource: string, payload: any) => {
    const response = await config.put(`/${resource}/${payload.id}`, payload);
    if (response.status !== 200) {
        throw new Error("Không thể cập nhật sách");
    }
    return response.data;
}
export { add, getAll, getById, remove, update };

