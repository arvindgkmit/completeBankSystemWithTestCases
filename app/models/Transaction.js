module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transactions", {
      id: {
        type         : Sequelize.INTEGER,
        primaryKey   : true,
        autoIncrement: true
      },
      accountNo: {
        type         : Sequelize.INTEGER,
        foreignKey   : true
      },
      type: {
        type      : Sequelize.ENUM('deposit', 'withdraw'),
        allowNull : false,
      },
      amount: {
        type         : Sequelize.INTEGER,
        allowNull    : false,
      },
      userId: {
        type         : Sequelize.INTEGER,
        allowNull    : false,
      },
      dateTime: {
        type         : 'TIMESTAMP',
        defaultValue : Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull    : false
      }
    },{
      tableName: false,
      timestamps: false
    });
  
    return Transaction;
  };