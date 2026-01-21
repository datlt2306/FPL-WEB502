import { useEffect, useState } from "react";
import type { TProduct } from "./types/product";
import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";

type Inputs = {
    name: string,
    price: number
}

function App() {
    // bước 1
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [products, setProducts] = useState<TProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get(`http://localhost:3000/api/products`);
            const data = await response.data;
            setProducts(data);
        }
        fetchProducts();
    }, []);

    const onHandleDelete = async (id: number | string) => {
        const confirm = window.confirm('Are you sure you want to delete this product?');
        if (!confirm) return;
        // call api
        await axios.delete(`http://localhost:3000/api/products/${id}`);

        // rerender
        setProducts(products.filter((p) => p.id !== id));
    }
    const onSubmit: SubmitHandler<Inputs> = async (formData) => {
        try {
            // call api
            const response = await axios.post(`http://localhost:3000/api/products`, formData);
            const data = await response.data;
            // rerender
            setProducts([...products, data]);
        } catch {
            throw new Error('Thêm thất bại')
        }
    }
    return (
        <>
            {/* Bước 2 */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register('name')} />
                <input type="number" {...register('price')} />
                <button type="submit">Thêm</button>
            </form>
            <ul>
                <ul>{products.map((product) => (
                    <li key={product.id}>{product.name}
                        <button onClick={() => onHandleDelete(product.id)}>Delete</button>
                    </li>
                ))}</ul>
            </ul ></>
    )
}

export default App;
