const db = require("../models");
const axios = require("axios");

const cartController = {
  cartChecker: async (req, res, next) => {
    try {
      const check = await db.Cart.findOne({
        where: {
          stock_id: req.params.id,
          user_id: req.user.id,
        },
      });
      req.check = check;
      next();
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  addQty: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const { qty } = req.body;
      const { discounted_price } = req.query;
      if (req.check?.dataValues?.id) {
        await db.Cart.update(
          {
            qty: parseInt(req.check.dataValues.qty) + qty,
          },
          {
            where: {
              stock_id: req.check.dataValues.stock_id,
              user_id: req.user.id,
            },
            transaction: trans,
          }
        );
        await trans.commit();
        return res.send({
          message: "jumlah produk berhasil ditambahkan",
        });
      } else {
        db.Cart.create({
          qty,
          stock_id: req.params.id,
          user_id: req.user.id,
          discounted_price: parseInt(discounted_price),
        });
        await trans.commit();
        return res.send({
          message: "Produk berhasil ditambahkan",
        });
      }
    } catch (err) {
      await trans.rollback();
      res.status(500).send({
        message: "Produk gagal ditambahkan",
      });
    }
  },
  getAllCart: async (req, res) => {
    try {
      const get = await db.Cart.findAll({
        where: {
          user_id: req.user.id,
        },
        include: [
          {
            model: db.Stock,
            as: "Stock",
            attributes: ["product_id"],
            include: [
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
              {
                model: db.Discount,
                as: "Discount",
                attributes: ["title", "nominal", "valid_start", "valid_to"],
              },
              {
                model: db.Branch,
                as: "Branch",
                attributes: [
                  "branch_name",
                  "branch_address",
                  "latitude",
                  "longitude",
                  "district",
                  "province",
                  "city_id",
                ],
              },
            ],
          },
        ],
      });
      return res.send({ message: "OK", result: get });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  updateQty: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const result = await db.Cart.update(
        {
          qty: req.body.qty,
        },
        {
          where: {
            stock_id: req.query.stock_id,
            user_id: req.user.id,
          },
          transaction: trans,
        }
      );
      await trans.commit();
      return res.send({
        message: "OK",
        result: result,
      });
    } catch (err) {
      await trans.rollback();
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteCart: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const del = await db.Cart.destroy({
        where: {
          stock_id: req.query.stock_id,
          user_id: req.user.id,
        },
        transaction: trans,
      });
      await trans.commit();
      return res.send({
        message: "data berhasil dihapus",
        result: del,
      });
    } catch (err) {
      await trans.rollback();
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getCost: async (req, res) => {
    try {
      const { origin, destination, weight, courier } = req.body;
      const input = {
        origin,
        destination,
        weight,
        courier,
      };
      const result = await axios.post(
        `https://api.rajaongkir.com/starter/cost`,
        input,
        {
          headers: {
            key: process.env.RajaOngkir_API_KEY,
          },
        }
      );
      res.status(200).send({
        message: "get cost success",
        data: result.data.rajaongkir.results,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = cartController;
