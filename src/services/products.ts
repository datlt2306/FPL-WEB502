import instance from "../config/api"

export const getAll = async (): Promise<any> => {
    try {
        const response = await instance.get('/products');
        if (response.status !== 200) {
            throw new Error("Loi API");
        }
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteProduct = async (id: number | string): Promise<any> => {
    try {
        const response = await instance.delete(`/products/${id}`);
        if (response.status !== 200) {
            throw new Error("Loi API");
        }
        return { success: true }
    } catch (error) {
        throw error;
    }
}