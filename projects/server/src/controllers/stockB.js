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
              "category_id",
              "desc",
              "weight",
            ],
          },
          {
            model: db.Discount,
            as: "Discount",
            attributes: ["nominal", "title", "valid_start", "valid_to"],
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
                "category_id",
              ],
              include: [
                {
                  model: db.Category,
                  as: "Category",
                  attributes: ["id", "category_name"],
                },
              ],
            },
          ],
          where: {
            [Op.or]: [
              { "$Product.product_name$": { [Op.like]: `%${search_query}%` } },
              { "$Product.desc$": { [Op.like]: `%${search_query}%` } },
              {
                "$Product.Category.category_name$": {
                  [Op.like]: `%${search_query}%`,
                },
              },
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

  insertStock: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const { quantity_stock, product_id, branch_id, discount } = req.body;
      console.log(req.body);
      await db.Stock.create(
        {
          quantity_stock: parseInt(quantity_stock),
          product_id: parseInt(product_id),
          branch_id: parseInt(branch_id),
          discount: parseInt(discount),
        },
        {
          transaction: trans,
        }
      );
      await trans.commit();
      return await db.Stock.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      await trans.rollback();
      return res.status(500).send({
        message: err.message,
      });
    }
  },

  editStock: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const { quantity_stock, discount } = req.body;
      const stok = await db.Stock.findOne({
        where: {
          id: req.params.id,
        },
      });
      console.log(stok);
      const qty_stok = quantity_stock
        ? quantity_stock
        : stok.dataValues.quantity_stock;
      const disc = discount ? discount : stok.dataValues.discount;

      await db.Stock.update(
        {
          quantity_stock: qty_stok,
          discount: disc,
        },
        {
          where: {
            id: req.params.id,
          },
          transaction: trans,
        }
      );
      await trans.commit();
      return await db.Stock.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      await trans.rollback();
      res.status(500).send({
        message: err.message,
      });
    }
  },

  deleteStock: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      await db.Stock.destroy({
        where: {
          //  id: req.params.id
          //   [Op.eq]: req.params.id
          id: req.params.id,
        },
      });
      await trans.commit();
      return await db.Stock.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      await trans.rollback();
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = stockControllerB;
