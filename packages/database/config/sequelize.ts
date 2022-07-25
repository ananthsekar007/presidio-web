import { Sequelize } from "sequelize";
import * as GoDB from "sequelize";
import * as config from "./config";

const sequelize = new Sequelize(config);

export { GoDB, sequelize };
export default sequelize;
