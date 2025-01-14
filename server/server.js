import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { routeNotFound, errorHandler } from "./middlewares/errorMiddleware.js"; // Import routeNotFound middleware
import userRoutes from "./routes/userRoutes.js";
// import taskRoutes from "./routes/taskRoutes.js"; // Import task routes



dotenv.config();

connectDB();

const app = express();

app.use(express.json());

console.log(taskRoutes)

// app.use("/api/users", userRoutes);
// app.use("/api/tasks", taskRoutes); // Use task routes

app.post('/api/tasks/create', createTask);


app.use(routeNotFound); // Use routeNotFound middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
