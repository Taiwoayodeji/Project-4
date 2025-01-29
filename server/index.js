import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/Users.js";
import questionRouter from "./routes/Questions.js";
import answerRouter from "./routes/Answers.js";
import db from "./config/database.js"; // Ensure you have a database connection file

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Define routes
app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);

// Test API response
app.get("/", (req, res) => {
  res.send("Welcome to the QAnswer Forum API!");
});

// Signup route (moved outside of app.listen)
app.post("/signup", async (req, res) => {
  const { user_name, email, password } = req.body;

  if (!user_name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Ensure `db.execute` works correctly
    const [result] = await db.execute(
      "INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)",
      [user_name, email, password]
    );

    res.status(201).json({ success: true, userId: result.insertId });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
