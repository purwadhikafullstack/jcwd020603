module.exports = (sequelize, Sequelize) => {
  const ShippingMethod = sequelize.define("ShippingMethods", {
    method_name: Sequelize.STRING,
  });
  return ShippingMethod;
};
