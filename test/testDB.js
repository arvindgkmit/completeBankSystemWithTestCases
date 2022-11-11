const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const testDb = () => {
  const sequelize = new Sequelize(
    "banktest",
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
  db.users = require("../app/models/User")(sequelize, Sequelize);
  db.accounts = require("../app/models/Account")(sequelize, Sequelize);
  db.transactions = require("../app/models/Transaction")(sequelize, Sequelize);

  // create association
  db.users.hasMany(db.accounts);
  db.accounts.belongsTo(db.users);

  try {
    db.sequelize.authenticate();
    sequelize.sync({ force: true });

    console.log("Test Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = testDb;
