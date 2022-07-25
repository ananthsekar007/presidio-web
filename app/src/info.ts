import sequelize from "@gogocode-package/database";
import { Resolver, Query } from "type-graphql";

@Resolver()
export class InfoResolver {
  @Query(
    () =>
      // _returns
      String
  )
  async info() {
    return sequelize
      .authenticate()
      .then(() => {
        return "DB Connection is live.";
      })
      .catch(() => {
        throw new Error("DB Connection is error");
      });
  }
}
