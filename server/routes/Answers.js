import express from "express";
import db from "../dbConnection.js";

const Router = express.Router();

// GET: Fetch answers for a specific question and user
Router.get("/", (req, res) => {
  const { question_id, user_id } = req.query;

  db.query(
    `SELECT * FROM Answers 
     INNER JOIN users ON Answers.user_id = users.user_id
     INNER JOIN Questions ON Answers.question_id = Questions.question_id
     WHERE Answers.question_id = ? AND Answers.user_id = ?`,
    [question_id, user_id],
    (err, result) => {
      if (err) {
        console.log("Error in fetching answers", err);
        res.status(500).send("Error in the query");
      } else {
        res.send(result); // Return the answers
      }
    }
  );
});

// POST: Post a new answer
Router.post("/", (req, res) => {
  const { question_id, user_id, body } = req.body;

  db.query(
    "INSERT INTO Answers (question_id, user_id, body) VALUES (?, ?, ?)",
    [question_id, user_id, body],
    (err, result) => {
      if (err) {
        console.log("Error in adding answer", err);
        res.status(500).send("Error adding answer");
      } else {
        res.status(201).send("Answer added successfully");
      }
    }
  );
});

export default Router;
