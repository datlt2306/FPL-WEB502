/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, message, Popconfirm, Table } from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import { deleteOne, getAll } from "./providers/dataProvider";

type TProduct = {
    id: number | string;
    name: string;
    price: number;
    description: string;
    instock: boolean;
};


function App() {
    const [messageApi, contextHolder] = message.useMessage();
    const [products, setProducts] = useState<TProduct[]>([]);

    useEffect(() => {
        const fetchsProduct = async () => {
            try {
                const data = await getAll({ resource: "products" });
                const newData = data.map((item: TProduct) => ({
                    ...item,
                    key: item.id,
                }));
                setProducts(newData);
            } catch (error: any) {
                throw new Error(error);
            }
        };
        fetchsProduct();
    }, []);
    const handleRemove = async (id: number | string) => {
        try {
            await deleteOne({ resource: 'products', id })
            messageApi.open({
                type: 'success',
                content: 'Xóa sản phẩm thành công!',
            });
            setProducts(products.filter((item) => item.id !== id));

        } catch (error: any) {
            throw new Error(error);
        }
    };


    const columns = [
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Tình trạng',
            dataIndex: 'instock',
            key: 'instock',
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (_: any, item: TProduct) => {
                return (
                    <>
                        <Popconfirm
                            title="Delete the task"
                            description="Are you sure to delete this task?"
                            onConfirm={() => handleRemove(item.id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="primary" danger>Xóa</Button>
                        </Popconfirm>
                        <Button>Cập nhật</Button>
                    </>
                )
            }
        }
    ];
    return (
        <>
            {contextHolder}
            <h2>Quản lý sản phẩm</h2>
            <Table dataSource={products} columns={columns} />
        </>
    );
}

export default App;
