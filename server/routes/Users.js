import express from "express";
import db from "../dbConnection.js";

const Router = express.Router();

// GET: Fetch a user by username and password (Login)
Router.get("/", (req, res) => {
  const { user_name, user_password } = req.query;

  db.query(
    "SELECT * FROM users WHERE user_name = ? AND user_password = ?",
    [user_name, user_password],
    (err, result) => {
      if (err) {
        console.log("Error in fetching user", err);
        res.status(500).send("Error in the query");
      } else {
        if (result.length > 0) {
          res.send(result[0]); // Return the user data
        } else {
          res.status(404).send("User not found");
        }
      }
    }
  );
});

// POST: Register a new user
Router.post("/", (req, res) => {
  const { user_name, user_password } = req.body;

  db.query(
    "INSERT INTO users (user_name, user_password) VALUES (?, ?)",
    [user_name, user_password],
    (err, result) => {
      if (err) {
        console.log("Error in adding user", err);
        res.status(500).send("Error adding user");
      } else {
        res.status(201).send("User added successfully");
      }
    }
  );
});

export default Router;
