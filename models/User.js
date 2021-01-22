module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(),
        allowNull: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    }
  );
