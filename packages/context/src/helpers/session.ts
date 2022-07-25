import * as uuid from "uuid";
import { JWT_SECRET_TOKEN } from "../../config/app_config";
import { BaseContext } from "../contexts/BaseContext";
import * as jwt from "jsonwebtoken";

export const generateDbToken = () => {
  return uuid.v1() + "-gogocode-" + uuid.v4() + Math.random();
};

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
