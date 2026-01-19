/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from "antd";
import { useEffect, useState } from "react";
import "./App.css";
import { getAll } from "./providers/dataProvider";

type TProduct = {
    id: number | string;
    name: string;
    price: number;
    description: string;
    instock: boolean;
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
];
function App() {
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
    // const handleRemove = async (id: number | string) => {
    //     const confirm = window.confirm("Bạn có chắc chắn muốn xóa không?");
    //     if (!confirm) return;
    //     try {
    //         await deleteOne({ resource: 'products', id })
    //         setProducts(products.filter((item) => item.id !== id));
    //     } catch (error: any) {
    //         throw new Error(error);
    //     }
    // };
    return (
        <>
            <h2>Quản lý sản phẩm</h2>
            <Table dataSource={products} columns={columns} />
        </>
    );
}

export default App;
