import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import depthLimit from "graphql-depth-limit";
import request from "supertest";

import * as superagent from "superagent";

import { buildSchema } from "type-graphql";

const gqlDepthLimit = 7;
const gqlPath = "/hoastation-nodejs/graphql";

export function buildTestingApolloServer(app: express.Application, resolvers: any) {
  return new Promise((resolve, reject) => {
    buildSchema({
      resolvers: resolvers,
      emitSchemaFile: true,
      validate: false,
    })
      .then((schema) => {
        const graphqlServer = new ApolloServer({
          schema,
          validationRules: [depthLimit(gqlDepthLimit)],
          context: ({ req }) => {
            return { req };
          },
        });
        graphqlServer.applyMiddleware({ app, path: gqlPath });
        resolve();
        console.log("graphql init done");
      })
      .catch((err) => {
        reject(err);
        console.log(err);
        console.log("graphql init fail");
      });
  });
}
export const testingServer: express.Application = express();

export function queryGraphql(server: express.Application, query: string, token?: string): Promise<superagent.Response> {
  return new Promise((resolve, reject) => {
    request(server)
      .post("/graphql")
      .set("Authorization", `Bearer ${token}`)
      .send({
        query,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          expect(true).toBe(false);
          reject(err);
        }
        resolve(res);
      });
  });
}
