import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/Users.js";
import questionRouter from "./routes/Questions.js";
import answerRouter from "./routes/Answers.js";
import db from "./dbConnection.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the QAnswer Forum API!");
});

app.post("/api/users", async (req, res) => {
  const { user_name, user_email, user_password } = req.body;

  if (!user_name || !user_email || !user_password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await db.execute(
      "INSERT INTO users (user_name, user_email, user_password) VALUES (?, ?, ?)",
      [user_name, user_email, user_password]
    );

    console.log("Database result:", result);

    if (result && typeof result === "object" && "affectedRows" in result) {
      if (result.affectedRows === 1) {
        res.status(201).json({ success: true, userId: result.insertId });
      } else {
        res.status(500).json({ error: "User creation failed" });
      }
    } else {
      res.status(500).json({ error: "Unexpected database response format" });
    }
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
