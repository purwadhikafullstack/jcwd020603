const db = require("../models");
const moment = require("moment");

const orderController = {
  getAll: async (req, res) => {
    try {
      const get = await db.Order.findAll({
        where: {
          user_id: req.user.id,
        },
      });
      return res.status(200).send({
        message: "OK",
        result: get,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getByOrderId: async (req, res) => {
    try {
      const order = await db.Order.findAll({
        where: {
          user_id: req.user.id,
        },
        limit: 1,
        order: [["createdAt", "DESC"]],
      });
      res.status(200).send({
        message: "OK",
        result: order,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  postOrder: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const { total, status, selectedItems } = req.body;
      const order = await db.Order.create(
        {
          date: moment().format(),
          total: total,
          status: status,
          user_id: req.user.id,
          order_number: `TRX-${moment().format("mmddyyyyhhmmss")}`,
        },
        { transaction: trans }
      );
      const arrInput = selectedItems.map((val) => {
        return {
          quantity: val.qty,
          order_id: order.id,
          stock_id: val.stock_id,
        };
      });
      await db.OrderDetail.bulkCreate(arrInput, { transaction: trans });
      for (item of selectedItems) {
        const check = await db.Stock.findOne({
          where: {
            id: item.stock_id,
          },
        });
        check.quantity_stock -= item.qty;
        await check.save({ transaction: trans });
      }
      const arrStockHistory = selectedItems.map((val) => {
        return {
          status: "DECREMENT",
          status_quantity: val.qty,
          feature: "Pemesanan Konsumen",
        };
      });
      await db.StockHistory.bulkCreate(arrStockHistory, { transaction: trans });
      await trans.commit();
      return res.status(200).send({
        message: "Silahkan selesaikan pembayaran",
      });
    } catch (err) {
      await trans.rollback();
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = orderController;
