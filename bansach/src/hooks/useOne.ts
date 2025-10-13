import { useQuery } from "@tanstack/react-query";
import { getById } from "../services/api.services";

export const useOne = ({ resource, id }: { resource: string, id: number | string }) => {
    return useQuery({
        queryKey: [resource, id],
        queryFn: async () => await getById({ resource, id }),
    });
}