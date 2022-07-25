import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable("appointments", {
    appointment_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "user_id",
      },
    },
    center_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "vaccination_center",
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
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable("appointments");
}
