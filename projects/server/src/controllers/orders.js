const db = require("../models");

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
};

module.exports = orderController;
