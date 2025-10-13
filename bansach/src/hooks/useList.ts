/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { getAll } from "../services/api.services";

export const useList = ({ resource }: { resource: string }) => {
    return useQuery({
        queryKey: [resource],
        queryFn: async () => {
            const data = await getAll({ resource });
            return data.map((item: any) => {
                return {
                    key: item.id,
                    ...item,
                };
            });
        },
    });
}