module.exports = (sequelize, Sequelize) => {
  const Voucher = sequelize.define(
    "Vouchers",
    {
      title: Sequelize.STRING,
      valid_start: Sequelize.DATE,
      valid_to: Sequelize.DATE,
      voucher_code: Sequelize.STRING,
      nominal: Sequelize.INTEGER,
      desc: Sequelize.STRING,
      minimal_order: Sequelize.INTEGER,
      limit: Sequelize.INTEGER,
    },
    {
      paranoid: true,
    }
  );
  return Voucher;
};
