import { sequelize, GoDB } from "@gogocode-package/database";
import { ObjectType, Field, ID } from "type-graphql";
import { UserModel } from "../auth/UserModel";
import { VaccinationCenterModel } from "../vaccination_center/VaccinationCenterModel";

@ObjectType()
export class AppointmentModel extends GoDB.Model {
  @Field(() => ID)
  appointment_id: number;
  @Field()
  user_id: number;
  @Field()
  center_id: number;
  @Field()
  appointment_time: Date;
  @Field()
  vaccine_type: "COVAXIN" | "COVISHIELD";

  @Field(() => UserModel)
  UserModel: UserModel;

  @Field(() => VaccinationCenterModel)
  VaccinationCenterModel: VaccinationCenterModel;

  @Field({ nullable: true })
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

const DataTypes = GoDB.DataTypes;

AppointmentModel.init(
  {
    appointment_id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: UserModel,
        key: "user_id",
      },
    },
    center_id: {
      type: DataTypes.INTEGER,
      references: {
        model: VaccinationCenterModel,
        key: "center_id",
      },
    },
    appointment_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    vaccine_type: {
      type: DataTypes.ENUM("COVAXIN", "COVISHIELD"),
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
    tableName: "appointments",
    paranoid: true,
  }
);

AppointmentModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  targetKey: "user_id",
});

AppointmentModel.belongsTo(VaccinationCenterModel, {
  foreignKey: "center_id",
  targetKey: "center_id",
});
