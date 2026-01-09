import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Hello from "./components/Hello";

function App() {
    return (
        <>
            <Hello name="John" age={30} />
        </>
    );
}

export default App;
