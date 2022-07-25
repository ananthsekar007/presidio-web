import { sequelize, GoDB } from "@gogocode-package/database";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export default class ConfigurationModel extends GoDB.Model {
  @Field(() => ID)
  public id!: number;
  @Field()
  public configuration_key!: string;

  @Field()
  public configuration_value!: string;
}
ConfigurationModel.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: GoDB.DataTypes.INTEGER,
    },
    configuration_key: {
      type: GoDB.DataTypes.STRING(255),
      allowNull: false,
    },
    configuration_value: {
      type: GoDB.DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "configurations",
  }
);
