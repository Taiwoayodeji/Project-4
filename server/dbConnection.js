import mysql from "mysql2";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create a connection to the MySQL database
const db = mysql.createConnection({
  host: process.env.DB_HOST, // Database host (e.g., localhost)
  user: process.env.DB_USER, // Database username (e.g., root)
  password: process.env.DB_PASSWORD, // Database password
  database: process.env.DB_NAME, // Database name (e.g., QAnswer)
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

// Export the database connection for use in other files
export default db;
