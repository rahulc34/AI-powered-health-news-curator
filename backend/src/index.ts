import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

import articleRoutes from "./routes/articleRoutes";
import explainRoutes from "./routes/explainRoutes";

const app = express();
app.use(cors());
app.use(express.json());

// API routes
app.use("/articles", articleRoutes);
app.use("/explain", explainRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Backend running on port", PORT);
});
