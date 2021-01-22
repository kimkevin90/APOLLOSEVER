module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "Like",
    {
      username: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: false,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );
