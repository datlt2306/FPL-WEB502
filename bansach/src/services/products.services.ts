import config from "../config/api";

const getAll = async () => {
    const response = await config.get("/books");
    if (response.status !== 200) {
        throw new Error("Không thể lấy danh sách sách");
    }
    return response.data;
}

export { getAll };
