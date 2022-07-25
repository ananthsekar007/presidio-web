import request from "supertest";
import server, { httpServer } from "./../server/index";
import { buildApolloServer } from "../server/graphql";

describe("GET info graphql", function () {
  beforeAll((done) => {
    buildApolloServer(server, httpServer).then(() => {
      done();
    });
  });
  it("responds with success with database live", function (done) {
    request(server)
      .post("/hoastation-nodejs/graphql")
      .send({ query: "{ info }" })
      .expect(200)
      .end((err, res) => {
        expect("DB Connection is live.").toBe(res.body.data.info);
        done();
      });
  });
});
