import express from 'express';
import cors from "cors";
import { connectDB } from "./config/db";

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors());

// Define routes
// app.use("/api/users", userRoutes)
// app.use("/api/auth", authRoutes)
// app.use("/api/profile", profileRoutes)
// app.use("/api/posts", postsRoutes)

app.get("/", (req, res) => {
    res.status(200).send("API is running...")
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`)
});