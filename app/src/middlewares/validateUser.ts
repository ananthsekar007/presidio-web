import { Context } from "./../contexts/Context";
import { MiddlewareFn } from "type-graphql";
import { extractAuthToken } from "../helpers/JwtHelper";
import { UserModel } from "../auth/UserModel";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET_TOKEN } from "../config";

export const validateUser: MiddlewareFn<Context> = async ({ context }, next) => {
  const token = extractAuthToken(context);

  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET_TOKEN, async (err: any, decoded: any) => {
      if (err) {
        reject("Authentication Failed, Re-Login!");
      }
      context.user = decoded.token;
      resolve(next());
    });
  });
};
