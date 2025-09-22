/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";

const TodoReactQuery = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["TODOS"],
        queryFn: async () => {
            const response = await fetch("http://localhost:3000/todos");
            const data = await response.json();
            return data;
        },
    });
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    return <div>{data.map((todo: any) => todo.title)}</div>;
};

export default TodoReactQuery;
/**
 * B1: npm i @tanstack/react-query
 * B2: Truy cập main.tsx và thêm const queryClient = new QueryClient();
 * B3: <QueryClientProvider client={queryClient}>
 *      <App />
 * </QueryClientProvider>
 * B4: Truy cập component và sử dụng
 * useQuery({
 *      queryKey: ["TODOS"],
 *      queryFn: async () => {
 *          const response = await fetch("http://localhost:3000/todos");
 *          const data = await response.json();
 *          return data;
 *      },
 * });
 */
