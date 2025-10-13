import { useQuery } from "@tanstack/react-query";
import { getAll } from "../services/api.services";

export const useList = (resource: string) => {
    return useQuery({
        queryKey: [resource],
        queryFn: async () => {
            const data = await getAll();
            return data.map((item: IProduct) => {
                return {
                    key: item.id,
                    ...item,
                };
            });
        },
    });
}