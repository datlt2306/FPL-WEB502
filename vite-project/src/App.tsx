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
    return <TodoReactQuery />;
};

export default App;
