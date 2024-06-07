const express = require("express");
const connectDB = require("./app/config/database");
const taskRoutes = require("./app/routes/taskRoutes");
const subtaskRoutes = require("./app/routes/subTaskRoute");
const userRoutes = require("./app/routes/userRoutes");
const { config } = require("dotenv");
const setupSwagger = require("./app/config/swager");

const app = express();

config();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", taskRoutes);
app.use("/api", subtaskRoutes);
app.use("/api", userRoutes);

// Setting Up Swagger
setupSwagger(app);

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
