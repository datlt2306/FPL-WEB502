import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton, Table } from "antd";
import Title from "antd/es/typography/Title";
import type { IProduct } from "../interfaces/IProduct";
import { getAll } from "../services/products.services";

const { Column } = Table;
const ProductList = () => {
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
    if (error) return <div>Error: {error.message}</div>;
    const onHandleDelete = (id: number) => {
        console.log(id);
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
                        render={() => {
                            return (
                                <div>
                                    <Button type="primary">Edit</Button>
                                    <Button type="primary" danger onClick={() => onHandleDelete(1)}>
                                        Delete
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
