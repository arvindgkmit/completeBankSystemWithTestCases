// const mysql = require("mysql");
const Sequelize = require("sequelize");
const dotenv = require("dotenv");
const { hash } = require("bcrypt");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_ROOT,
  "Arvind@gkmit#123",
  {
    host: process.env.DATABASE_HOST,
    dialect: "mysql",
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// use models
db.users = require("./User")(sequelize, Sequelize);
db.accounts = require("./Account")(sequelize, Sequelize);
db.transactions = require("./Transaction")(sequelize, Sequelize);

// create association
db.users.hasMany(db.accounts);
db.accounts.belongsTo(db.users);

module.exports = db;
