const db = require("../models");
const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  createStockHistory: async (stok, input) => {
    const trans = await db.sequelize.transaction();
    try {
      await db.StockHistory.create(
        {
          stock_id: stok.id,
          quantity_before: input.quantity_before,
          status: input.status,
          status_quantity: input.status_quantity,
          quantity_after: input.quantity_after,
          feature: input.feature,
        },
        {
          transaction: trans,
        }
      );
      await trans.commit();
      return true;
    } catch (err) {
      console.log(err);
      await trans.rollback();
      return false;
    }
  },
};
