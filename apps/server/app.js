import express from "express";
import cors from "cors";
import morgan from "morgan";
import rootRoute from "./routes/rootRoute.js";
import formRoutes from "./routes/formRoutes.js";
import dotenv from "dotenv";
import connectDB from "./configdb/db.js";

// const authRoutes = require("./routes/authRoutes");

// dot env config
dotenv.config();

// db connection
connectDB();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api/v1/form", formRoutes);

// root route
app.use("/", rootRoute);

export default app;
