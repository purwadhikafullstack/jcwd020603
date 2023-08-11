const db = require("../models");

const voucherController = {
  getAll: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const fetch = await db.Voucher.findAll();
      await trans.commit();
      res.send({
        message: "OK",
        result: fetch,
      });
    } catch (err) {
      await trans.rollback();
      res.status(500).send({
        message: err.message,
      });
    }
  },
  updateLimit: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const { limit } = req.query;
      console.log("QUERY LIMIT", limit);
      const newLimit = limit - 1;
      console.log("INI LIMIT", newLimit);
      const patch = await db.Voucher.update(
        {
          limit: newLimit,
        },
        {
          where: { id: req.params.id },
          transaction: trans,
        }
      );
      await trans.commit();
      res.send({
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

module.exports = voucherController;
