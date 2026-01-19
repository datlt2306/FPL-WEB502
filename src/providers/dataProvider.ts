import instance from "../config/api";


const dataProvider = {
    getAll: async ({ resource }: { resource: string }) => {
        const response = await instance.get(`/${resource}`);
        if (response.status !== 200) {
            throw new Error("Loi API");
        }
        return response.data;
    },
    deleteOne: async ({ resource, id }: { resource: string, id: number | string }) => {
        const response = await instance.delete(`/${resource}/${id}`);
        if (response.status !== 200) {
            throw new Error("Loi API");
        }
        return { success: true }
    }
}
export const { getAll, deleteOne } = dataProvider;
