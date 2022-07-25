import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable("vaccination_center", {
    center_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
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
        model: "users",
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
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable("vaccination_center");
}
