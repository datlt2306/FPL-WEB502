/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

function App() {
    const queryClient = useQueryClient();
    const [valueInput, setValueInput] = useState({
        tenSach: "",
        moTa: "",
        namXuatBan: "",
        nhaXuatBan: "",
        tacGia: "",
    });
    const { data: books, isLoading } = useQuery({
        queryKey: ["BOOKS"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:3000/books`);
            return response.data;
        },
    });
    const { mutate: deleteBook } = useMutation({
        mutationFn: async (id) => {
            await axios.delete(`http://localhost:3000/books/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["BOOKS"],
            });
        },
    });
    const { mutate: addBook } = useMutation({
        mutationFn: async (formData) => {
            await axios.post(`http://localhost:3000/books`, formData);
        },
        onSuccess: () => {
            alert("Thêm sách thành công");
            queryClient.invalidateQueries({
                queryKey: ["BOOKS"],
            });
        },
    });

    if (isLoading) return <div>Loading...</div>;

    const handleDelete = (id) => {
        deleteBook(id);
    };
    const onHandleInput = (e) => {
        const { name, value } = e.target;

        setValueInput({
            ...valueInput,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        addBook(valueInput);
    };
    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nhập tên sách"
                    name="tenSach"
                    onInput={(e) => onHandleInput(e)}
                />
                <input
                    type="text"
                    placeholder="Nhập mô tả"
                    name="moTa"
                    onInput={(e) => onHandleInput(e)}
                />
                <input
                    type="number"
                    placeholder="Nhập năm xuất bản"
                    name="namXuatBan"
                    onInput={(e) => onHandleInput(e)}
                />
                <input type="text" placeholder="Nhập nhà xuất bản" name="nhaXuatBan" />
                <input
                    type="text"
                    placeholder="Nhập tác giả"
                    name="tacGia"
                    onInput={(e) => onHandleInput(e)}
                />
                <button type="submit">Thêm</button>
            </form>
            {books.map((book: any) => (
                <div key={book.id}>
                    {book.tenSach} <button onClick={() => handleDelete(book.id)}>Delete</button>
                </div>
            ))}
        </>
    );
}

export default App;
