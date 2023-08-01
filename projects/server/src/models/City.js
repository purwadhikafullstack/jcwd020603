module.exports = (sequelize, Sequelize) => {
  const City = sequelize.define(
    "Cities",
    {
      city_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      province_id: {
        type: Sequelize.INTEGER,
      },
      province: Sequelize.STRING,
      type: Sequelize.STRING,
      city_name: Sequelize.STRING,
      postal_code: Sequelize.STRING,
    },
    {
      paranoid: true,
    }
  );
  return City;
};
