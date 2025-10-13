import { useMutation, useQueryClient } from "@tanstack/react-query";
import { remove } from "../services/api.services";
// useDelete('products')
const useDelete = (resource: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => await remove(resource, id),
        // nếu xóa thành công
        onSuccess: () => {
            // gọi lại API để lấy dữ liệu mới nhất
            queryClient.invalidateQueries({
                queryKey: [resource],
            });
        },
    });
}
export default useDelete;