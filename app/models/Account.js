module.exports = (sequelize, Sequelize) => {
    const Account = sequelize.define("accounts", {
      accountNo: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true
      },
      type: {
        type      : Sequelize.ENUM('current', 'saving'),
        allowNull : false,
      },
      amount: {
        type         : Sequelize.INTEGER,
        allowNull    : false,
      },
      userId: {
        type         : Sequelize.INTEGER,
        foreignKey   : true
      },
      status: {
        type         : Sequelize.ENUM('active', 'inactive'),
        defaultValue   : "active"
      },
    },{
      initialAutoIncrement: 100000000,
      tableName: false,
      timestamps: false
    });
  
    return Account;
  };