import { Request } from "express";
import { ExecutionParams } from "subscriptions-transport-ws";

export type BaseContext = {
  req?: Request;
  connection?: ExecutionParams;
};
