import * as dotenv from "dotenv";
const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN || "default-token";

export { JWT_SECRET_TOKEN };
