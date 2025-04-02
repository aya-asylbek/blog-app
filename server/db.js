import pgPromise from "pg-promise";
import { config } from "dotenv";

// Load environment variables from .env file
config();

const pgp = pgPromise();

// Connect to the PostgreSQL database
const db = pgp({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // Include this if your database requires authentication
});

// Test the connection with a query
db.one("SELECT NOW()") // Fetches the current database time
  .then((data) => {
    console.log("Connected to the database");
    console.log("Database time:", data.now); // Prints the current time from the DB
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

export default db;
