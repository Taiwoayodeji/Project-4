import express from "express";
import db from "../dbConnection.js";

const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  const { user_name, user_password } = req.query;

  db.query(
    "SELECT * FROM users WHERE user_name = ? AND user_password = ?",
    [user_name, user_password],
    (err, result) => {
      if (err) {
        console.error("Error in fetching user:", err);
        res.status(500).json({ error: "Error in the query" });
      } else {
        if (result.length > 0) {
          res.json(result[0]);
        } else {
          res.status(404).json({ error: "User not found" });
        }
      }
    }
  );
});

export default userRouter;
