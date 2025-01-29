import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/Users.js";
import questionRouter from "./routes/Questions.js";
import answerRouter from "./routes/Answers.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRouter);
app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);
app.get("/", (req, res) => {
  res.send("Welcome to the QAnswer Forum API!");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
