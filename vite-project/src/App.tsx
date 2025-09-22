import { useState } from "react";
import "./App.css";
import TodoFetch from "./TodoFetch";
import TodoReactQuery from "./TodoReactQuery";

interface ITodo {
    id: number;
    title: string;
    completed: boolean;
}

const App = () => {
    const todosList: ITodo[] = [];

    const [todos, setTodos] = useState<ITodo[]>(todosList);
    const [newTodo, setNewTodo] = useState<string>("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingText, setEditingText] = useState<string>("");

    // Tính toán số lượng todo
    const completedCount = todos.filter((todo) => todo.completed).length;
    const pendingCount = todos.length - completedCount;

    // Thêm todo mới
    const handleAddTodo = () => {
        setTodos([...todos, { id: todos.length + 1, title: newTodo, completed: false }]);
        setNewTodo("");
    };
    // Toggle trạng thái hoàn thành
    const handleToggleComplete = (id: number) => {
        const newTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setTodos(newTodos);
    };

    // Xóa todo
    const handleDeleteTodo = (id: number) => {
        const confirm = window.confirm("Are you fucking sure???");
        if (!confirm) return;
        setTodos(todos.filter((todo) => todo.id !== id));
    };
    // Bắt đầu chỉnh sửa
    const handleStartEdit = (id: number, title: string) => {
        setEditingId(id);
        setEditingText(title);
    };

    // Lưu chỉnh sửa
    const handleSaveEdit = () => {
        if (editingText.trim() && editingId) {
            setTodos(
                todos.map((todo) =>
                    todo.id === editingId ? { ...todo, title: editingText.trim() } : todo
                )
            );
            setEditingId(null);
            setEditingText("");
        }
    };

    // Hủy chỉnh sửa
    const handleCancelEdit = () => {
        setEditingId(null);
        setEditingText("");
    };

    // Xử lý Enter key
    const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
        if (e.key === "Enter") {
            action();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <TodoFetch />
            <TodoReactQuery />
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
                            onInput={(e) => setNewTodo(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, handleAddTodo)}
                            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

export default App;
