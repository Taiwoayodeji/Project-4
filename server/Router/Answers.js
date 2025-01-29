import express from "express";
import db from "../../dbConnection.js";

const Router = express.Router();

// SELECT * FROM QAnswer.Answers
// INNER JOIN users ON Answers.user_id = users.user_id
// INNER JOIN Questions ON Answers.question_id = Questions.question_id
// WHERE Answers.question_id = 2
// AND
// Answers.user_id=1

Router.get("/", (req, res) => {
  const { question_id, user_id } = req.query;
  db.query(
    "SELECT * FROM QAnswer.Answers " &
      "INNER JOIN users ON Answers.user_id = users.user_id" &
      "INNER JOIN Questions ON Answers.question_id = Questions.question_id " &
      "WHERE Answers.question_id = ? " &
      "AND " &
      "Answers.user_id = ?",
    [question_id, user_id],
    (err, result) => {
      if (err) {
        console.log("Error in fetching answers", err);
        res.status(500).send("error in the Query");
      } else res.send(result);
    }
  );
});

export default Router;
