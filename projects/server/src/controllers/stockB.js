const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const { query } = require("express");
const stockControllerB = {
  getAllStock: async (req, res) => {
    try {
      const get = await db.Stock.findAll({
        include: [
          {
            model: db.Product,
            as: "Product",
            attributes: [
              "product_name",
              "price",
              "photo_product_url",
              "desc",
              // "weight",
            ],
          },
        ],
      });
      res.send(get);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  searchStock: async (req, res) => {
    try {
      const { search_query } = req.query;

      if (search_query) {
        const stocks = await db.Stock.findAll({
          include: [
            {
              model: db.Product,
              as: "Product",
              attributes: [
                "product_name",
                "price",
                "photo_product_url",
                "desc",
              ],
            },
          ],
          where: {
            [Op.or]: [
              { "$Product.product_name$": { [Op.like]: `%${search_query}%` } },
              { "$Product.desc$": { [Op.like]: `%${search_query}%` } },
            ],
          },
        });

        res.send(stocks);
      } else {
        const stocks = await db.Stock.findAll({
          include: [
            {
              model: db.Product,
              as: "Product",
              attributes: [
                "product_name",
                "price",
                "photo_product_url",
                "desc",
              ],
            },
          ],
        });

        res.send(stocks);
      }
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = stockControllerB;
