/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import { update } from "../services/api.services";

export const useUpdate = (resource: string, id: number | string) => {
    return useMutation({
        mutationFn: async (payload: any) => await update(resource, { ...payload, id: Number(id) }),
        onSuccess: () => {
            // router("/");
        },
    });
}