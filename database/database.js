import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2/promise';

// Create the MySQL connection pool
const pool = createPool({
  host: 'localhost',       // Database host
  user: 'root',            // Database user
  password: 'Abhay@123',   // Database password
  database: 'my_app', // Database name
});

// Initialize Drizzle ORM with the connection pool
const db = drizzle(pool);

export { db };
