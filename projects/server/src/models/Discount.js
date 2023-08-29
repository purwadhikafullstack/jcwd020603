module.exports = (sequelize, Sequelize) => {
  const Discount = sequelize.define("Discounts", {
    title: Sequelize.STRING,
    valid_start: Sequelize.DATE,
    valid_to: Sequelize.DATE,
    nominal: Sequelize.INTEGER,
    photo_discount_url : Sequelize.STRING
  },
  {
    paranoid : true
  }
  );
  return Discount;
};
