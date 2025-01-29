const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Xavier35@",
  database: "QAnswer",
});

app.post("/signup", async (req, res) => {
  const { user_name, user_password, user_email } = req.body;

  if (!user_name || !user_password || !user_email) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  pool.query(
    "SELECT * FROM Users WHERE user_name = ?",
    [user_name],
    async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ error: err.message });
      }

      if (results.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(user_password, 10);

      pool.query(
        "INSERT INTO Users (user_name, user_password, user_email) VALUES (?, ?, ?)",
        [user_name, hashedPassword, user_email],
        (err, results) => {
          if (err) {
            console.error("Error inserting user:", err);
            return res.status(500).json({ error: err.message });
          }

          const newUser = { user_id: results.insertId, user_name, user_email };
          res.json({ success: true, user: newUser });
        }
      );
    }
  );
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
