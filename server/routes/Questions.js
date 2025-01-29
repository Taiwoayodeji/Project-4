import express from "express";
import db from "../dbConnection.js";

const Router = express.Router();

Router.get("/", (req, res) => {
  db.query("SELECT * FROM Questions", (err, result) => {
    if (err) {
      console.log("Error in fetching questions", err);
      res.status(500).send("Error in the query");
    } else {
      res.send(result);
    }
  });
});

Router.post("/", (req, res) => {
  const { user_id, title, body } = req.body;

  db.query(
    "INSERT INTO Questions (user_id, title, body) VALUES (?, ?, ?)",
    [user_id, title, body],
    (err, result) => {
      if (err) {
        console.log("Error in adding question", err);
        res.status(500).send("Error adding question");
      } else {
        res.status(201).send("Question added successfully");
      }
    }
  );
});

export default Router;
