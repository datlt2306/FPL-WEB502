import { useState } from "react";
import "./App.css";

type TProduct = {
    id: number | string;
    name: string;
    price: number;
    description: string;
    instock: boolean;
};

function App() {
    const data = [
        {
            id: "1",
            name: "Laptop Pro X1",
            price: 1500,
            description: "A high-end laptop suitable for professionals and gaming.",
            instock: true,
        }, // item
        {
            id: 2,
            name: "Wireless Mouse",
            price: 25,
            description: "Ergonomic wireless mouse with adjustable DPI.",
            instock: true,
        },
        {
            id: 3,
            name: "Mechanical Keyboard",
            price: 85,
            description: "RGB backlit mechanical keyboard with blue switches.",
            instock: false,
        },
        {
            id: 4,
            name: "27-inch Monitor",
            price: 300,
            description: "4K UHD widescreen monitor with thin bezel design.",
            instock: true,
        },
        {
            id: 5,
            name: "Noise Cancelling Headphones",
            price: 120,
            description: "Over-ear headphones with active noise cancellation.",
            instock: true,
        },
        {
            id: 6,
            name: "Portable SSD 1TB",
            price: 150,
            description: "High-speed portable SSD with USB-C port.",
            instock: false,
        },
        {
            id: 7,
            name: "Smartwatch S7",
            price: 220,
            description: "Fitness-focused smartwatch with heart rate monitor.",
            instock: true,
        },
        {
            id: 8,
            name: "Bluetooth Speaker",
            price: 60,
            description: "Water-resistant portable Bluetooth speaker.",
            instock: true,
        },
        {
            id: 9,
            name: "Webcam HD 1080p",
            price: 45,
            description: "HD webcam suitable for streaming and video calls.",
            instock: false,
        },
        {
            id: 10,
            name: "USB-C Hub",
            price: 35,
            description: "7-in-1 USB-C hub with multiple ports for connectivity.",
            instock: true,
        },
    ];

    const [products] = useState<TProduct[]>(data);
    const handleRemove = (id: number | string): void => {
        console.log(id);
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
