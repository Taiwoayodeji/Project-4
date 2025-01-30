import express from "express";
import db from "../dbConnection.js";

const answerRouter = express.Router();

answerRouter.get("/", (req, res) => {
  const { question_id, user_id } = req.query;

  db.query(
    `SELECT * FROM Answers 
     INNER JOIN users ON Answers.user_id = users.user_id
     INNER JOIN Questions ON Answers.question_id = Questions.question_id
     WHERE Answers.question_id = ? AND Answers.user_id = ?`,
    [question_id, user_id],
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

answerRouter.post("/", (req, res) => {
  const { question_id, user_id, body } = req.body;

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
