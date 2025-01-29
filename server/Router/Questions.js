import express from "express";
import db from "../dbConnection.js";

const Router = express.Router();

Router.get("/", (req, res) => {
  const { user_name, user_password } = req.query;
  db.query("SELECT * FROM Questions", (err, result) => {
    if (err) {
      console.log("Error in fetching questions", err);
      res.status(500).send("error in the Query");
    } else res.send(result);
  });
});

Router.post("/", (req, res) => {
  const { question_id, user_id, answer_body } = req.body; // Get data from body
  db.query(
    "INSERT INTO Answers (question_id, user_id, answer_body) VALUES (?, ?, ?)",
    [question_id, user_id, answer_body],
    (err, result) => {
      if (err) res.status(500).send("Error adding student");
      else res.status(201).send("Student added successfully");
    }
  );
});

export default Router;
