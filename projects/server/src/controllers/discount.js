const db = require("../models");

const discountController = {
  getAll: async (req, res) => {
    try {
      const discounts = await db.Discount.findAll();
      if (!discounts || discounts.length === 0) {
        return res.status(404).send({ message: "No discount data found." });
      }
      res.status(200).send({ message: "Discount data", data: discounts });
    } catch (err) {
      console.error("Error while fetching discount data:", err);
      res.status(500).send({ message: "Failed to fetch discount data." });
    }
  },

  getDiscountB: async (req, res) => {
    try {
      const discount = await db.Discount.findAll();
      return res.send(discount);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },

  addDiscount: async (req, res) => {
    const { title, valid_start, valid_to, nominal, product_id } = req.body;
    console.log(req.body);
    try {
      const newDiscount = await db.Discount.create({
        title,
        valid_start,
        valid_to,
        nominal,
      });

      const editStock = await db.Stock.update(
        {
          discount_id: newDiscount.id,
        },
        {
          where: {
            product_id: {
              [db.Sequelize.Op.in]: product_id,
            },
          },
        }
      );
      res.status(200).send({
        message: "Data Discount berhasil ditambahkan",
        data: res.data,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  updateDiscount: async (req, res) => {
    const { title, valid_start, valid_to, nominal, product_id, discount_id } =
      req.body;
    console.log(req.body, "ini bodynya");
    try {
      await db.Discount.update(
        {
          nominal,
        },
        { where: { id: discount_id } }
      );
      await db.Stock.update(
        { discount_id: null },
        { where: { discount_id: discount_id } }
      );
      await db.Stock.update(
        { discount_id: discount_id },
        {
          where: {
            product_id: { [db.Sequelize.Op.in]: product_id },
          },
        }
      );

      res.status(200).send({ message: "Data diskon berhasil diubah" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  deleteDiscount: async (req, res) => {
    try {
      const { discount_id } = req.body;
      console.log(req.body, "ini diskon id nya");
      await db.Discount.destroy({
        where: {
          id: discount_id,
        },
      });

      await db.Stock.update(
        {
          discount_id: null,
        },
        {
          where: {
            discount_id: discount_id,
          },
        }
      );
      res.status(200).send({ message: "data discount berhasil dihapus" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = discountController;
