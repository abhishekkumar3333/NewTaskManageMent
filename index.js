import express from "express";
import "dotenv/config";
import router from "./src/routes/index.js";

const app = express();
app.use(express.json());
app.use(router);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
