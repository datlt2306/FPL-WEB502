import jsonServer from "json-server";
import auth from "json-server-auth";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

// Cấu hình middleware
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Cấu hình CORS
server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    if (req.method === "OPTIONS") {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Thiết lập database cho json-server-auth
server.db = router.db;

// Sử dụng json-server-auth để xử lý authentication, áp dụng cho /api/*
server.use("/api", auth);

// Sử dụng router cho endpoint bắt đầu bằng /api
server.use("/api", router);

// Cấu hình port
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`\n🚀 JSON Server đang chạy tại http://localhost:${PORT}`);
    console.log(`\n📡 API endpoints:`);
    console.log(`   - Products: http://localhost:${PORT}/api/products`);
    console.log(`   - Users: http://localhost:${PORT}/api/users`);
    console.log(`   - Register: http://localhost:${PORT}/api/register`);
    console.log(`   - Login: http://localhost:${PORT}/api/login`);
    console.log(`\n💡 Database file: ${join(__dirname, "db.json")}\n`);
});
