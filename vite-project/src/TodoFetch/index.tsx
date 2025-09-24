import { useEffect, useState } from "react";

type Todo = {
    id: number;
    title: string;
    completed: boolean;
};

const TodoFetch = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [newTodo, setNewTodo] = useState<string>("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState<string>("");

    const todosApiUrl = "http://localhost:3000/todos";

    const pendingCount = todos.filter((t) => !t.completed).length;
    const completedCount = todos.filter((t) => t.completed).length;

    useEffect(() => {
        setLoading(true);
        const fetchTodos = async () => {
            try {
                const response = await fetch(todosApiUrl);
                if (!response.ok) {
                    throw new Error(`Lỗi tải danh sách: ${response.status}`);
                }
                const data = (await response.json()) as Todo[];
                setTodos(data);
                setError(null);
            } catch (e) {
                const message = e instanceof Error ? e.message : "Đã xảy ra lỗi không xác định";
                setError(message);
            } finally {
                setLoading(false);
            }
        };
        fetchTodos();
    }, []);

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, action: () => void) => {
        if (e.key === "Enter") action();
    };

    const handleAddTodo = async () => {
        const title = newTodo.trim();
        if (!title) return;
        try {
            const response = await fetch(todosApiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, completed: false }),
            });
            if (!response.ok) throw new Error("Không thể tạo công việc");
            const created = (await response.json()) as Todo;
            setTodos((prev) => [created, ...prev]);
            setNewTodo("");
            setError(null);
        } catch (e) {
            const message = e instanceof Error ? e.message : "Đã xảy ra lỗi";
            setError(message);
        }
    };

    const handleDeleteTodo = async (id: number) => {
        try {
            const response = await fetch(`${todosApiUrl}/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Không thể xóa công việc");
            setTodos((prev) => prev.filter((t) => t.id !== id));
            setError(null);
        } catch (e) {
            const message = e instanceof Error ? e.message : "Đã xảy ra lỗi";
            setError(message);
        }
    };

    const handleToggleComplete = async (id: number) => {
        const target = todos.find((t) => t.id === id);
        if (!target) return;
        const nextCompleted = !target.completed;
        try {
            const response = await fetch(`${todosApiUrl}/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: nextCompleted }),
            });
            if (!response.ok) throw new Error("Không thể cập nhật trạng thái");
            setTodos((prev) =>
                prev.map((t) => (t.id === id ? { ...t, completed: nextCompleted } : t))
            );
            setError(null);
        } catch (e) {
            const message = e instanceof Error ? e.message : "Đã xảy ra lỗi";
            setError(message);
        }
    };

    const handleStartEdit = (id: number, title: string) => {
        setEditingId(id);
        setEditingText(title);
    };

    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingText("");
    };

    const handleSaveEdit = async () => {
        if (editingId === null) return;
        const title = editingText.trim();
        if (!title) return handleCancelEdit();
        try {
            const response = await fetch(`${todosApiUrl}/${editingId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title }),
            });
            if (!response.ok) throw new Error("Không thể lưu chỉnh sửa");
            setTodos((prev) => prev.map((t) => (t.id === editingId ? { ...t, title } : t)));
            setError(null);
        } catch (e) {
            const message = e instanceof Error ? e.message : "Đã xảy ra lỗi";
            setError(message);
        } finally {
            handleCancelEdit();
        }
    };

    if (loading) return <div className="p-6 text-center">Loading....</div>;
    if (error)
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-50">
                <div className="bg-white border border-red-200 text-red-700 p-4 rounded-md">
                    {error}
                </div>
            </div>
        );
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">📝 Todo List</h1>
                    <p className="text-gray-600">Quản lý công việc của bạn một cách hiệu quả</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                        <div className="text-2xl font-bold text-blue-600">{todos.length}</div>
                        <div className="text-sm text-gray-600">Tổng cộng</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                        <div className="text-2xl font-bold text-orange-600">{pendingCount}</div>
                        <div className="text-sm text-gray-600">Chưa hoàn thành</div>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm text-center">
                        <div className="text-2xl font-bold text-green-600">{completedCount}</div>
                        <div className="text-sm text-gray-600">Đã hoàn thành</div>
                    </div>
                </div>

                {/* Add Todo Form */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="Nhập công việc mới..."
                            value={newTodo}
                            onInput={(e) => setNewTodo((e.target as HTMLInputElement).value)}
                            onKeyPress={(e) => handleKeyPress(e, handleAddTodo)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            aria-label="Nhập công việc mới"
                        />
                        <button
                            onClick={handleAddTodo}
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                        >
                            Thêm
                        </button>
                    </div>
                </div>

                {/* Todo List */}
                <div className="space-y-3">
                    {todos.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                            <div className="text-6xl mb-4">📝</div>
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">
                                Chưa có công việc nào
                            </h3>
                            <p className="text-gray-500">Hãy thêm công việc đầu tiên của bạn!</p>
                        </div>
                    ) : (
                        todos.map((todo) => (
                            <div
                                key={todo.id}
                                className={`bg-white rounded-lg shadow-sm p-4 transition-all duration-200 hover:shadow-md ${
                                    todo.completed ? "opacity-75" : ""
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleToggleComplete(todo.id)}
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
                                            todo.completed
                                                ? "bg-green-500 border-green-500 text-white"
                                                : "border-gray-300 hover:border-green-500"
                                        }`}
                                        aria-label={
                                            todo.completed
                                                ? "Đánh dấu chưa hoàn thành"
                                                : "Đánh dấu hoàn thành"
                                        }
                                    >
                                        {todo.completed && "✓"}
                                    </button>

                                    {editingId === todo.id ? (
                                        <div className="flex-1 flex gap-2">
                                            <input
                                                type="text"
                                                value={editingText}
                                                onChange={(e) => setEditingText(e.target.value)}
                                                onKeyPress={(e) =>
                                                    handleKeyPress(e, handleSaveEdit)
                                                }
                                                onBlur={handleSaveEdit}
                                                className="flex-1 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                autoFocus
                                            />
                                            <button
                                                onClick={handleSaveEdit}
                                                className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                                            >
                                                ✓
                                            </button>
                                            <button
                                                onClick={handleCancelEdit}
                                                className="px-2 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <span
                                                className={`flex-1 cursor-pointer ${
                                                    todo.completed
                                                        ? "line-through text-gray-500"
                                                        : "text-gray-800"
                                                }`}
                                                onDoubleClick={() =>
                                                    handleStartEdit(todo.id, todo.title)
                                                }
                                                title="Double click để chỉnh sửa"
                                            >
                                                {todo.title}
                                            </span>

                                            <button
                                                onClick={() => handleStartEdit(todo.id, todo.title)}
                                                className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                                                aria-label="Chỉnh sửa công việc"
                                                title="Chỉnh sửa"
                                            >
                                                ✏️
                                            </button>

                                            <button
                                                onClick={() => handleDeleteTodo(todo.id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                                aria-label="Xóa công việc"
                                                title="Xóa"
                                            >
                                                🗑️
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodoFetch;
