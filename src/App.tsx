/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import instance from "./config/api";
import { deleteProduct, getAll } from "./services/products";

type TProduct = {
    id: number | string;
    name: string;
    price: number;
    description: string;
    instock: boolean;
};

function App() {
    const [products, setProducts] = useState<TProduct[]>([]);

    useEffect(() => {
        const fetchsProduct = async () => {
            try {
                const data = await getAll();
                setProducts(data);
            } catch (error: any) {
                throw new Error(error);
            }
        };
        fetchsProduct();
    }, []);
    const handleRemove = async (id: number | string) => {
        const confirm = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (!confirm) return;
        try {
            // call api
            await deleteProduct(id);
            // rerender
            setProducts(products.filter((item) => item.id !== id));
        } catch (error: any) {
            throw new Error(error);
        }
    };
    return (
        <>
            {products.map((item) => (
                <li key={item.id}>
                    {item.name} - {item.price} -{" "}
                    <button onClick={() => handleRemove(item.id)}>Xoa</button>
                </li>
            ))}
        </>
    );
}

export default App;
