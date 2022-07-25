import express, { Request, Response } from "express";
import * as dotenv from "dotenv";

import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";

import bcrypt from "bcrypt";
import "reflect-metadata";
dotenv.config();
import { ErrorHandler } from "@gogocode-package/backend-utils/src/handler";
// import { indexRouter } from "../src/index";

process.env.TZ = "UTC";

const app: express.Application = express();

/* eslint-disable */
const http = require("http");

dotenv.config();
import "./env";

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../../public/"));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

let router: any;

/* eslint-disable */
// app.use("/", indexRouter);
app.get("/error", (req, res) => {
  ErrorHandler.response(res, 500, "Internal Server Error", null);
});

// global error handler
app.use((err: any, req: Request, res: Response, next: any) => {
  console.error(err);
  if (err.code === "LIMIT_FILE_SIZE") {
    return ErrorHandler.response(res, 403, "Max File Size allowed is 5MB", null);
  }
  ErrorHandler.response(res, 500, "Internal Server Error", null);
});
const httpServer = http.createServer(app);

export default app;
export { httpServer };
