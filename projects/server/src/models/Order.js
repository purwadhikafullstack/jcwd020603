const moment = require("moment")

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
  },
  {
    paranoid: true,
    hooks: {
      afterCreate: async (instance, options) => {
        const order_number = `TRX-${moment().format("DDMMYYYY")}${
          instance.id
        }${moment().format("HHmmss")}`;

        await instance.update(
          { order_number: order_number },
          { transaction: options.transaction }
        );
      },
    },
  }
  );
  return Order;
};
