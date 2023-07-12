module.exports = (sequelize, Sequelize) => {
  const Discount = sequelize.define("Discounts", {
    isOneFree: { type: Sequelize.BOOLEAN, defaultValue: false },
    tittle: Sequelize.STRING,
    valid_start: Sequelize.DATE,
    valid_to: Sequelize.DATE,
    nominal: Sequelize.STRING,
  });
  return Discount;
};
