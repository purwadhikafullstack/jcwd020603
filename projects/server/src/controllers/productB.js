const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const { query } = require("express");
const product_image = process.env.product_image;

const productController = {
  getAll: async (req, res) => {
    try {
      const product = await db.Product.findAll();
      return res.send(product);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },

  getAllAdmin: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const page = req.query.page - 1 || 0;
      const search = req.query.search || "";
      const category_id = req.query.category_id;
      let whereClause = {};
      if (req.query.search) {
        whereClause[Op.or] = [{ product_name: { [Op.like]: `%${search}%` } }];
      }
      if (req.query.category_id) {
        whereClause.category_id = req.query.category_id;
      }
      const product = await db.Product.findAndCountAll({
        where: whereClause,
        limit: 8,
        offset: 8 * page,
      });
      await trans.commit();
      return res.status(200).send({
        message: "OK",
        result: product.rows,
        total: Math.ceil(product.count / 8),
      });
    } catch (err) {
      await trans.rollback();
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },

  getSelector: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const selector = await db.Product.findAll();
      await trans.commit();
      res.status(200).send({
        message: "OK",
        result: selector,
      });
    } catch (err) {
      await trans.rollback();
      res.status(500).send({
        message: err.message,
      });
    }
  },

  getById: async (req, res) => {
    try {
      const product = await db.Product.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(product);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  // Pencarian berdasarkan nama produk dan harga
  getProduct: async (req, res) => {
    try {
      const sortBy = req.query.sortBy || "productName";
      const sortDir = req.query.sortDir || "ASC";

      const search = req.query.search_query || "";
      const product = await db.Product.findAll({
        where: {
          [Op.or]: [
            { productName: { [Op.like]: "%" + search + "%" } },
            { harga: { [Op.like]: "%" + search + "%" } },
            { categoryId: { [Op.like]: search } },
          ],
        },
        order: [[sortBy, sortDir]],
      });
      return res.send(product);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },

  insertProduct: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const { product_name, price, category_id, desc, weight } = req.body;
      const { filename } = req.file;

      await db.Product.create(
        {
          product_name,
          price: parseInt(price),
          category_id: parseInt(category_id),
          desc,
          weight: parseInt(weight),
          photo_product_url: product_image + filename,
        },
        {
          transaction: trans,
        }
      );
      await trans.commit();
      return await db.Product.findAll().then((result) => {
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

  editProduct: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const { product_name, price, desc, category_id, weight } = req.body;
      // const { filename } = req.file;
      const produk = await db.Product.findOne({
        where: {
          id: req.params.id,
        },
      });
      const prod_nm = product_name
        ? product_name
        : produk.dataValues.product_name;
      const prod_price = price ? price : produk.dataValues.price;
      const prod_desc = desc ? desc : produk.dataValues.desc;
      const prod_category = category_id
        ? category_id
        : produk.dataValues.category_id;
      const prod_weight = weight ? weight : produk.dataValues.weight;
      const prod_img = req.file
        ? product_image + req.file.filename
        : produk.dataValues.photo_product_url;

      await db.Product.update(
        {
          product_name: prod_nm,
          price: prod_price,
          desc: prod_desc,
          category_id: prod_category,
          weight: prod_weight,
          photo_product_url: prod_img,
        },
        {
          where: {
            id: req.params.id,
          },
          transaction: trans,
        }
      );
      await trans.commit();
      return await db.Product.findOne({
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

  deleteProduct: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      await db.Product.destroy({
        where: {
          //  id: req.params.id
          //   [Op.eq]: req.params.id
          id: req.params.id,
        },
        transaction: trans,
      });
      await trans.commit();
      return await db.Product.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      await trans.rollback();
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = productController;
