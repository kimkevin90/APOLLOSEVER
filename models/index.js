"use strict";

const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Post = require("./Post")(sequelize, Sequelize);
db.User = require("./User")(sequelize, Sequelize);
db.Likes = require("./Likes")(sequelize, Sequelize);
db.Comment = require("./Comment")(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post);

db.Post.hasMany(db.Likes);
db.Likes.belongsTo(db.Post);

module.exports = db;
