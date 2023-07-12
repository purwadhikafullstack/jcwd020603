module.exports = (sequelize, Sequelize) => {
  const OrderDetail = sequelize.define("OrderDetails", {
    quantity: Sequelize.INTEGER,
  });
  return OrderDetail;
};
