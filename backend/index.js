import express from "express";
import cors from "cors";
import "dotenv/config";
import router from "./src/routes/index.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(router);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
