module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define("Orders", {
    date: Sequelize.DATE,
    total: Sequelize.INTEGER,
    status: Sequelize.ENUM(
      "Menunggu Pembayaran",
      "Menunggu Konfirmasi Pembayaran",
      "Diproses",
      "Dikirim",
      "Pesanan Dikonfirmasi",
      "Dibatalkan"
    ),
    order_number: Sequelize.STRING,
    order_transfer_url: Sequelize.STRING,
    shipping_cost: Sequelize.INTEGER,
    discount_voucher: Sequelize.INTEGER,
  });
  return Order;
};
