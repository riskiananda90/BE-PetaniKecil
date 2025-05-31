import express from "express";
import cors from "cors";
import router from "./routers";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 3001;
app.use(express.json({ limit: "10mb" }));
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
