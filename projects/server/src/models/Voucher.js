module.exports = (sequelize, Sequelize) => {
  const Voucher = sequelize.define("Vouchers", {
    tittle: Sequelize.STRING,
    valid_start: Sequelize.DATE,
    valid_to: Sequelize.DATE,
    voucher_code: Sequelize.STRING,
    nominal: Sequelize.STRING,
  });
  return Voucher;
};
