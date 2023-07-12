module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define("Address", {
    address: Sequelize.STRING,
    name_address: Sequelize.STRING,
    phone_address: Sequelize.INTEGER,
    district: Sequelize.STRING,
    city: Sequelize.STRING,
    province: Sequelize.STRING,
    longitude: Sequelize.STRING,
    latitude: Sequelize.STRING,
  });
  return Address;
};
