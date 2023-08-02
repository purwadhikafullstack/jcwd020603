const db = require("../models");

const orderDetailController = {
  getAll: async (req, res) => {
    try {
      const get = await db.OrderDetail.findAll({
        where: {
          order_id: req.params.id,
        },
        include: [
          {
            model: db.Order,
            as: "Order",
            attributes: ["date", "total", "status", "order_number"],
          },
          {
            model: db.Product,
            as: "Product",
            attributes: [
              "product_name",
              "price",
              "photo_product_url",
              "desc",
              "weight",
            ],
          },
        ],
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
};

module.exports = orderDetailController;
