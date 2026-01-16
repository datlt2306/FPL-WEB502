import instance from "../config/api";


const dataProvider = {
    getAll: async ({ resource }: { resource: string }) => {
        try {
            const response = await instance.get(`/${resource}`);
            if (response.status !== 200) {
                throw new Error("Loi API");
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteOne: async ({ resource, id }: { resource: string, id: number | string }) => {
        try {
            const response = await instance.delete(`/${resource}/${id}`);
            if (response.status !== 200) {
                throw new Error("Loi API");
            }
            return { success: true }
        } catch (error) {
            throw error;
        }
    }
}
export const { getAll, deleteOne } = dataProvider;
