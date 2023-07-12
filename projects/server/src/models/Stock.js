module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define("Stocks", {
    quantity_stock: Sequelize.INTEGER,
  });
  return Stock;
};
