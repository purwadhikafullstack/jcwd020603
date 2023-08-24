const db = require("../models");
const moment = require("moment");
const { nanoid } = require("nanoid");
const { Op, where } = require("sequelize");
const payment_image = process.env.payment_image;

const orderController = {
  getAll: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const whereClause = {
        user_id: req.user.id,
      };
      const status1 = req.query.status.split(",")[0];
      const status2 = req.query.status.split(",")[1];
      if (req.query.status) {
        whereClause.status = {
          [Op.or]: [{ [Op.eq]: status1 }, { [Op.eq]: status2 }],
        };
      }
      console.log(whereClause);
      const get = await db.Order.findAll({
        where: whereClause,
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
      const sort = req.query.sort || "createdAt";
      const order = req.query.order || "DESC";
      const page = req.query.page - 1 || 0;
      const search = req.query.search || "";
      const time = req.query.time || null;
      const time2 = req.query.time2 || null;
      const status = req.query.status || "";
      const branch_id = req.query.branch_id;
      console.log("page", page);
      let where = {};
      if (time && time2) {
        where.createdAt = {
          [Op.and]: [
            {
              [Op.gte]: moment(time).startOf("date"),
            },
            {
              [Op.lte]: moment(time2).endOf("date"),
            },
          ],
        };
      }

      if (search) {
        where[Op.or] = [{ order_number: { [Op.like]: `%${search}%` } }];
      }
      if (branch_id) {
        where.branch_id = req.query.branch_id;
      }
      if (status) {
        where.status = { [Op.like]: `%${status}%` };
      }
      console.log(where);
      const get = await db.Order.findAndCountAll({
        where: where,
        include: [
          {
            model: db.Address,
            as: "Address",
          },
          { model: db.User, as: "User" },
        ],
        order: [[sort, order]],
        limit: 5,
        offset: 5 * page,
      });
      const whereClause = {};
      if (branch_id) {
        whereClause.branch_id = req.query.branch_id;
      }
      const count = await db.Order.count({
        where: whereClause,
      });
      const whereFilter = {
        status: { [Op.or]: ["Dibatalkan", "Pesanan Dikonfirmasi"] },
      };
      if (branch_id) {
        whereFilter.branch_id = req.query.branch_id;
      }
      const filterCount = await db.Order.count({
        where: whereFilter,
      });
      await trans.commit();
      return res.status(200).send({
        message: "OK",
        result: get.rows,
        total: Math.ceil(get.count / 5),
        count: count,
        done: filterCount,
        undone: count - filterCount,
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
      const whereClause = {
        user_id: req.user.id,
      };
      if (req.query.order_number) {
        whereClause.order_number = req.query.order_number;
      }

      const order = await db.Order.findAll({
        where: whereClause,
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
          {
            model: db.User,
            as: "User",
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
          {
            model: db.User,
            as: "User",
          },
          {
            model: db.OrderDetail,
            as: "Order",
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
      const order = await db.Order.create(
        {
          date: moment().add(15, "minutes"),
          total: total,
          status: status,
          user_id: req.user.id,
          shipping_cost: shipping_cost,
          address_id,
          discount_voucher: discount_voucher,
          branch_id: selectedItems[0].Stock?.branch_id,
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
            feature: "Ordered by Consument",
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
      return res.status(500).send({
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
      let whereClause;
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
        console.log("checkcok", check);
        const arrStockHistory = [
          {
            status: "INCREMENT",
            status_quantity: item.quantity,
            feature: "Cancelled Order",
            stock_id: item.stock_id,
            quantity_before: check.quantity_stock,
            quantity_after: (check.quantity_stock += item.quantity),
          },
        ];
        console.log(arrStockHistory);
        const post = await db.StockHistory.bulkCreate(arrStockHistory, {
          transaction: trans,
        });
        console.log("check", check.dataValues.quantity_stock);
        console.log("item", item.quantity);
        const newQuantity = check.dataValues.quantity_stock;
        console.log("newQuantity", newQuantity);
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
  cancelOrderAutomatically: async () => {
    const trans = await db.sequelize.transaction();
    console.log("udah jalan");
    try {
      const currentTime = moment().utc();
      const findOrder = await db.Order.findOne({
        where: {
          status: "Menunggu Pembayaran",
          date: { [Op.lte]: currentTime },
        },
        include: [
          {
            model: db.OrderDetail,
            as: "Order",
            require: false,
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
      });
      console.log("findOrder", findOrder);
      console.log("Waktu Sekarang:", currentTime);
      console.log("Tanggal Pesanan:", findOrder.date);
      if (findOrder) {
        const patch = await db.Order.update(
          {
            status: "Dibatalkan",
          },
          {
            where: {
              id: findOrder.id,
            },
            transaction: trans,
          }
        );
        console.log(patch);
        if (patch[0] === 1) {
          for (const item of findOrder?.Order) {
            const check = await db.Stock.findOne({
              where: {
                id: item.stock_id,
              },
            });
            const arrStockHistory = [
              {
                status: "INCREMENT",
                status_quantity: item.quantity,
                feature: "Cancelled Order",
                stock_id: item.stock_id,
                quantity_before: check.quantity_stock,
                quantity_after: (check.quantity_stock += item.quantity),
              },
            ];
            const post = await db.StockHistory.bulkCreate(arrStockHistory, {
              transaction: trans,
            });
            console.log("post", post);
            const newQuantity = check.dataValues.quantity_stock;
            console.log("newQuantity", newQuantity);
            check.setDataValue("quantity_stock", newQuantity);
            await check.save({ transaction: trans });
          }
        } else {
          return console.log("gagal mengupdate");
        }
      } else {
        return console.log("tidak ada order yang menunggu pembayaran");
      }
      await trans.commit();
    } catch (err) {
      await trans.rollback();
      console.error("Error in cancelOrderAutomatically:", err.message);
    }
  },
  changeStatusOrder: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const patch = await db.Order.update(
        {
          status: req.body.status,
        },
        {
          where: { id: req.params.id },
          transaction: trans,
        }
      );
      console.log("ini cancel order otomatis");
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
