import * as uuid from "uuid";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET_TOKEN } from "../config";
import { BaseContext } from "../contexts/BaseContext";

export const generateJWTToken = (token: object | string): string => {
  return jwt.sign(
    {
      token,
    },
    JWT_SECRET_TOKEN
  );
};

export const extractAuthToken = (context: BaseContext): string => {
  const authorization = context.req.headers.authorization || "";
  return authorization.split(" ")[1];
};
