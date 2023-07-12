module.exports = (sequelize, Sequelize) => {
  const City = sequelize.define("Cities", {
    city_name: Sequelize.STRING,
    type: Sequelize.STRING,
    postal_code: Sequelize.STRING,
  });
  return City;
};
