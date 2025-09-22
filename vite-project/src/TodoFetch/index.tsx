/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

const TodoFetch = () => {
    const [todos, setTodos] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchTodos = async () => {
            try {
                const response = await fetch("http://localhost:3000/todos");
                const data = await response.json();
                setTodos(data);
                setLoading(false);
            } catch (error: any) {
                setError(error.response.data.message);
                setLoading(false);
            }
        };
        fetchTodos();
    }, []);

    if (loading) return <div>Loading....</div>;
    if (error) return <div>{error}</div>;
    return <div>{todos.map((todo: any) => todo.title)}</div>;
};

export default TodoFetch;
