import express from "express";
import {
  ApolloServer,
  // PubSub
} from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import { buildSchema } from "type-graphql";
import { Context } from "../src/types/Context";
import { UserResolver } from "../src/auth/UserResolver";
import { VaccinationCenterResolver } from "../src/vaccination_center/VaccinationCenterResolver";
import { AppointmentResolver } from "../src/appointments/AppointmentResolver";

const gqlDepthLimit = 7;
const gqlPath = "/graphql";

export function buildApolloServer(app: express.Application, httpServer) {
  return new Promise((resolve, reject) => {
    buildSchema({
      resolvers: [UserResolver, VaccinationCenterResolver, AppointmentResolver],
      emitSchemaFile: true,
      validate: false,
    })
      .then((schema) => {
        const graphqlServer = new ApolloServer({
          schema,
          validationRules: [depthLimit(gqlDepthLimit)],
          context: ({ req, connection }): Context => {
            return { req, connection };
          },
          formatError: (err) => {
            return err;
          },
          subscriptions: {
            onConnect: (
              connectionParams: any
              // webSocket
            ) => {
              const token = connectionParams.Authorization;
              if (token) {
              }
              throw new Error("invalid token");
            },
          },
        });
        graphqlServer.applyMiddleware({ app, path: gqlPath });
        graphqlServer.installSubscriptionHandlers(httpServer);
        resolve({});
        console.log("graphql init done");
      })
      .catch((err) => {
        reject(err);
        console.log(err);
        console.log("graphql init fail");
      });
  });
}
