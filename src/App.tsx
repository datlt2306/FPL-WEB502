/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

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
                const response = await axios.get("http://localhost:3000/api/products");
                if (response.status !== 200) {
                    throw new Error("Loi API");
                }
                setProducts(response.data);
            } catch (error: any) {
                throw new Error(error);
            }
        };
        fetchsProduct();
    });
    const handleRemove = (id: number | string): void => {
        // rerender
        setProducts(products.filter((item) => item.id !== id));
    };
    return (
        <>
            {products.map((item) => (
                <li key={item.id}>
                    {item.name} - {item.price} -{" "}
                    <button onClick={() => handleRemove(item.id)}>Xoa</button>
                </li>
            ))}
            {/* <ProductList /> */}
        </>
    );
}

export default App;
