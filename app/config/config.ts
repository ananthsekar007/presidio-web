import * as dotenv from "dotenv";
dotenv.config();
module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: 3306,
  dialect: "mysql",
  dialectOptions: {
    bigNumberStrings: true,
    charset: "utf8",
    collate: "utf8mb4_unicode_ci",
  },
  // uncomment this to see SQL query for migration
  // logging: console.log,
  pool: { maxConnections: 10, maxIdleTime: 30 },
};
