module.exports = (sequelize, Sequelize) => {
  const StockHistory = sequelize.define("StockHistories", {
    status: Sequelize.ENUM("INCREMENT", "DECREMENT"),
    status_quantity: Sequelize.INTEGER,
    feature: Sequelize.STRING,
    quantity_before: Sequelize.INTEGER,
    quantity_after: Sequelize.INTEGER,
  });
  return StockHistory;
};
