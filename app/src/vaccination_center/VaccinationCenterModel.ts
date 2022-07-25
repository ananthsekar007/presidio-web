import { sequelize, GoDB } from "@gogocode-package/database";
import { ObjectType, Field, ID } from "type-graphql";
import { UserModel } from "../auth/UserModel";

@ObjectType()
export class VaccinationCenterModel extends GoDB.Model {
  @Field(() => ID)
  public center_id: number;
  @Field()
  public name: string;
  @Field()
  public location: string;
  @Field()
  public admin_id: string;

  @Field(() => UserModel)
  public UserModel: UserModel;

  @Field({ nullable: true })
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const DataTypes = GoDB.DataTypes;

VaccinationCenterModel.init(
  {
    center_id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
    admin_id: {
      type: DataTypes.INTEGER,
      references: {
        model: UserModel,
        key: "user_id",
      },
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
    tableName: "vaccination_center",
    paranoid: true,
  }
);
