module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "Comment",
    {
      body: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
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
