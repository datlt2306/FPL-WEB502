import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Skeleton, Table } from "antd";
import Title from "antd/es/typography/Title";
import type { IProduct } from "../interfaces/IProduct";
import { getAll, remove } from "../services/products.services";

const { Column } = Table;
const ProductList = () => {
    const queryClient = useQueryClient();
    const { data, isLoading, error } = useQuery({
        queryKey: ["BOOKS"],
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

    const { mutate, isPending } = useMutation({
        mutationFn: async (id: number) => await remove(id),
        // nếu xóa thành công
        onSuccess: () => {
            // gọi lại API để lấy dữ liệu mới nhất
            queryClient.invalidateQueries({
                queryKey: ["BOOKS"],
            });
        },
    });

    if (error) return <div>Error: {error.message}</div>;
    const onHandleDelete = (id: number) => {
        // call API xóa sản phẩm
        const confirm = window.confirm("Are you sure?");
        if (!confirm) return;
        mutate(id);
    };
    return (
        <div>
            <Title level={2}>Danh sách sách</Title>
            <Skeleton loading={isLoading}>
                <Table dataSource={data}>
                    <Column title="Tên sách" dataIndex="tenSach" key="tenSach" />
                    <Column title="Mô tả" dataIndex="moTa" key="moTa" />
                    <Column title="Năm suất bản" dataIndex="namXuatBan" key="namXuatBan" />
                    <Column title="Nhà xuất bản" dataIndex="nhaXuatBan" key="nhaXuatBan" />
                    <Column title="Tác giả" dataIndex="tacGia" key="tacGia" />
                    <Column
                        render={(item: IProduct) => {
                            return (
                                <div>
                                    <Button type="primary">Edit</Button>
                                    <Button
                                        type="primary"
                                        danger
                                        onClick={() => onHandleDelete(item.id)}
                                    >
                                        {isPending ? "Deleting..." : "Delete"}
                                    </Button>
                                </div>
                            );
                        }}
                    />
                </Table>
            </Skeleton>
        </div>
    );
};

export default ProductList;
