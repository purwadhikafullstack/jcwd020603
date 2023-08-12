module.exports = (sequelize, Sequelize) => {
  const Stock = sequelize.define(
    "Stocks",
    {
      quantity_stock: Sequelize.INTEGER,
    },
    {
      paranoid: true,
    }
  );
  return Stock;
};
