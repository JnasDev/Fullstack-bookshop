import mysql from "mysql2";
import { config } from "dotenv";

config();

const db = mysql.createConnection({
  host: "lcpbq9az4jklobvq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  user: "h4cwv53ozl32w9w8",
  password: "regvioujxpnyv7mz",
  database: "q2nq64i4kdl5aajd",
});

export default db;
