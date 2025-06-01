"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routers_1 = __importDefault(require("./routers"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json({ limit: "10mb" }));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", routers_1.default);
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
