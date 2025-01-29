import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/Users.js"; // Import the Users router
import questionRouter from "./routes/Questions.js"; // Import the Questions router
import answerRouter from "./routes/Answers.js"; // Import the Answers router

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Routes
app.use("/api/users", userRouter); // Use the Users router for /api/users
app.use("/api/questions", questionRouter); // Use the Questions router for /api/questions
app.use("/api/answers", answerRouter); // Use the Answers router for /api/answers

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the QAnswer Forum API!");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
