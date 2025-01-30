import express from "express";
import db from "../dbConnection.js";

const questionRouter = express.Router();

questionRouter.get("/", (req, res) => {
  db.query("SELECT * FROM Questions", (err, result) => {
    if (err) {
      console.error("Error in fetching questions", err);
      res.status(500).json({ error: "Error in the query" });
    } else {
      res.json(result);
    }
  });
});

questionRouter.post("/", (req, res) => {
  const { user_id, title, body } = req.body;

  db.query(
    "INSERT INTO Questions (user_id, title, body) VALUES (?, ?, ?)",
    [user_id, title, body],
    (err, result) => {
      if (err) {
        console.error("Error in adding question", err);
        res.status(500).json({ error: "Error adding question" });
      } else {
        res.status(201).json({ message: "Question added successfully" });
      }
    }
  );
});

export default questionRouter;
