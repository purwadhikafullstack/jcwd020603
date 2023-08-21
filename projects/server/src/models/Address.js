module.exports = (sequelize, Sequelize) => {
  const Address = sequelize.define(
    "Address",
    {
      address: Sequelize.STRING,
      district: Sequelize.STRING,
      province: Sequelize.STRING,
      longitude: Sequelize.STRING,
      latitude: Sequelize.STRING,
      address_name: Sequelize.STRING,
      address_phone: Sequelize.STRING,
      is_primary: { type: Sequelize.BOOLEAN, defaultValue: false },
      current_address: { type: Sequelize.BOOLEAN, defaultValue: false },
    },
    {
      paranoid: true,
    }
  );
  return Address;
};
