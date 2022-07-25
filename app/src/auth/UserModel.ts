import { sequelize, GoDB } from "@gogocode-package/database";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class UserModel extends GoDB.Model {
  @Field(() => ID)
  user_id: number;
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field({ defaultValue: false })
  is_admin: boolean;
  @Field({ nullable: true })
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const DataTypes = GoDB.DataTypes;

UserModel.init(
  {
    user_id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
    },
    createdAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    tableName: "users",
    paranoid: true,
  }
);
