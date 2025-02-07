import express from "express";
import db from "../dbConnection.js";

const answerRouter = express.Router();

// GET /api/answers
// GET /api/answers
answerRouter.get("/", (req, res) => {
  const { question_id } = req.query;

  db.query(
    `SELECT Answers.*, users.user_name 
     FROM Answers 
     INNER JOIN users ON Answers.user_id = users.user_id
     WHERE Answers.question_id = ?`,
    [question_id],
    (err, result) => {
      if (err) {
        console.error("Error in fetching answers", err);
        res.status(500).json({ error: "Error in the query" });
      } else {
        res.json(result);
      }
    }
  );
});

// POST /api/answers
answerRouter.post("/", (req, res) => {
  const { question_id, user_id, body } = req.body;

  // Validate required fields
  if (!question_id || !user_id || !body) {
    return res
      .status(400)
      .json({ error: "question_id, user_id, and body are required" });
  }

  // Insert the answer into the database
  db.query(
    "INSERT INTO Answers (question_id, user_id, body) VALUES (?, ?, ?)",
    [question_id, user_id, body],
    (err, result) => {
      if (err) {
        console.error("Error in adding answer", err);
        res.status(500).json({ error: "Error adding answer" });
      } else {
        res.status(201).json({ message: "Answer added successfully" });
      }
    }
  );
});

export default answerRouter;
