module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("Carts", {
    qty: Sequelize.INTEGER,
    discounted_price: Sequelize.INTEGER,
  });
  return Cart;
};
