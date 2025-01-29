import express from "express";
import db from "../dbConnection.js";

const Router = express.Router();

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
