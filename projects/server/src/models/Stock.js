module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define("Stocks", {
    quantity_stock: Sequelize.INTEGER,
    discount: Sequelize.INTEGER,
  });
  return Stock;
};
