import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./libs/db.js"; // Make sure the file extension is included
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5174", // Adjust if your frontend URL changes
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

// Sample route (optional, to test)
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// Start the server and connect DB
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await connectDB(); // Call the DB connection function properly
});
