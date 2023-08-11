const db = require("../models");
const moment = require("moment");
const payment_image = process.env.payment_image;

const orderController = {
  getAll: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const get = await db.Order.findAll({
        where: {
          user_id: req.user.id,
        },
        include: [
          {
            model: db.OrderDetail,
            as: "Order",
            require: false,
            right: true,
            include: [
              {
                model: db.Stock,
                as: "Stock",
                include: [
                  {
                    model: db.Product,
                    as: "Product",
                  },
                ],
              },
            ],
          },
        ],
        order: [["createdAt", "DESC"]],
      });
      await trans.commit();
      return res.status(200).send({
        message: "OK",
        result: get,
      });
    } catch (err) {
      await trans.rollback();
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getAllAdmin: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const pages = req.query.pages || 0;
      let where = {};
      if (req.query.branch_id) {
        where = { branch_id: req.query.branch_id };
      }
      const get = await db.Order.findAndCountAll({
        where: where,
        include: [
          {
            model: db.OrderDetail,
            as: "Order",
            require: false,
            right: true,
            include: [
              {
                model: db.Stock,
                as: "Stock",
                include: [
                  {
                    model: db.Product,
                    as: "Product",
                  },
                ],
              },
            ],
          },
          {
            model: db.Address,
            as: "Address",
          },
        ],
        limit: 5,
        offset: 5 * pages,
      });
      await trans.commit();
      return res.status(200).send({
        message: "OK",
        result: get.rows,
        total: Math.ceil(get.count / 5),
      });
    } catch (err) {
      await trans.rollback();
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getByOrderId: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const order = await db.Order.findAll({
        where: {
          user_id: req.user.id,
        },
        limit: 1,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.Address,
            as: "Address",
            include: [
              {
                model: db.City,
                as: "City",
              },
            ],
          },
        ],
      });
      await trans.commit();
      res.status(200).send({
        message: "OK",
        result: order,
      });
    } catch (err) {
      await trans.rollback();
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getByOrderNumber: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const order = await db.Order.findOne({
        where: {
          order_number: req.query.order_number,
        },
        include: [
          {
            model: db.Address,
            as: "Address",
            include: [
              {
                model: db.City,
                as: "City",
              },
            ],
          },
        ],
      });
      await trans.commit();
      res.status(200).send({
        message: "OK",
        result: order,
      });
    } catch (err) {
      await trans.rollback();
      res.status(500).send({
        message: err.message,
      });
    }
  },
  postOrder: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const {
        total,
        status,
        selectedItems,
        shipping_cost,
        address_id,
        discount_voucher,
      } = req.body;
      console.log(req.body);
      const order = await db.Order.create(
        {
          date: moment().add(15, "minutes"),
          total: total,
          status: status,
          user_id: req.user.id,
          order_number: `TRX-${moment().format("mmddyyyyhhmmss")}`,
          shipping_cost: shipping_cost,
          address_id,
          discount_voucher: discount_voucher,
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
        const arrStockHistory = [
          {
            status: "DECREMENT",
            status_quantity: item.qty,
            feature: "Pemesanan Konsumen",
            stock_id: item.stock_id,
            quantity_before: check.quantity_stock,
            quantity_after: check.quantity_stock - item.qty,
          },
        ];

        await db.StockHistory.bulkCreate(arrStockHistory, {
          transaction: trans,
        });
        check.quantity_stock -= item.qty;
        await check.save({ transaction: trans });
      }
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
  postPaymentImg: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const paymentImg = req.file;
      const orderDetVal = JSON.parse(req.body.orderDetVal);
      const patch = await db.Order.update(
        {
          order_transfer_url: payment_image + paymentImg.filename,
          status: "Menunggu Konfirmasi Pembayaran",
        },
        {
          where: {
            id: req.params.id,
          },
          transaction: trans,
        }
      );
      for (item of orderDetVal) {
        console.log(item.id);
        await db.Cart.destroy({
          where: {
            user_id: req.user.id,
            stock_id: item.stock_id,
          },
          transaction: trans,
        });
      }
      await trans.commit();
      res.status(200).send({
        message: "OK",
        result: patch,
      });
    } catch (err) {
      await trans.rollback();
      res.status(500).send({
        message: err.message,
      });
    }
  },
  cancelOrder: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const { orderDetVal } = req.body;
      const patch = await db.Order.update(
        {
          status: "Dibatalkan",
        },
        {
          where: {
            id: req.params.id,
          },
          transaction: trans,
        }
      );
      for (item of orderDetVal) {
        const check = await db.Stock.findOne({
          where: {
            id: item.stock_id,
          },
        });
        const arrStockHistory = [
          {
            status: "INCREMENT",
            status_quantity: item.quantity,
            feature: "Pembatalan Pesanan",
            stock_id: item.stock_id,
            quantity_before: check.quantity_stock,
            quantity_after: (check.quantity_stock += item.quantity),
          },
        ];
        console.log(arrStockHistory);
        const post = await db.StockHistory.bulkCreate(arrStockHistory, {
          transaction: trans,
        });
        console.log(post);
        const newQuantity = check.dataValues.quantity_stock + item.quantity;
        check.setDataValue("quantity_stock", newQuantity);
        await check.save({ transaction: trans });
      }
      await trans.commit();
      res.status(200).send({
        message: "OK",
        result: patch,
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
