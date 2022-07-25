import * as dotenv from "dotenv";
dotenv.config({ path: "../../app/.env" });
dotenv.config({ path: "./app/.env" });
module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: 3306,
  dialect: "mysql",
  dialectOptions: {
    bigNumberStrings: true,
  },
  logging: process.env.DB_SQL_LOG ? console.log : false,
  pool: { maxConnections: 10, maxIdleTime: 30 },
};
