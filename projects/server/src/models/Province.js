module.exports = (sequelize, Sequelize) => {
  const Province = sequelize.define("Provinces", {
    province: Sequelize.STRING,
  });
  return Province;
};
