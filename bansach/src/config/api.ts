import axios from "axios";

const config = axios.create({
    baseURL: "http://localhost:3001",
});

export default config;