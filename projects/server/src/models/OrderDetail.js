<<<<<<< HEAD
module.exports = (sequelize, Sequelize) => {
  const OrderDetail = sequelize.define("OrderDetails", {
    quantity: Sequelize.INTEGER,
    current_price: Sequelize.INTEGER,
  });
  return OrderDetail;
};
=======
module.exports = (sequelize, Sequelize) => {
  const OrderDetail = sequelize.define("OrderDetails", {
    quantity: Sequelize.INTEGER,
    current_price: Sequelize.STRING,
  });
  return OrderDetail;
};
>>>>>>> develop
