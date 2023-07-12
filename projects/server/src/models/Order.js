module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Orders", {
    date: Sequelize.DATE,
    total: Sequelize.INTEGER,
    status: Sequelize.ENUM(
      "Menunggu Pembayaran, Diproses, Selesai, Dibatalkan"
    ),
  });
  return Order;
};
