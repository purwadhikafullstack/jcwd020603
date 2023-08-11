module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define("Stocks", {
    quantity_stock: Sequelize.INTEGER,
    discounted_price: Sequelize.INTEGER,
  });
  return Stock;
};
