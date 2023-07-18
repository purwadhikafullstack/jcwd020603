const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const { query } = require("express");
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

      console.log(req.query.sortBy);
      console.log(req.query.sortDir);

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
  editProduct: async (req, res) => {
    try {
      const { productName, harga, stock, categoryId } = req.body;
      // const { filename } = req.file;
      await db.Product.update(
        {
          productName,
          harga,
          stock,
          categoryId,
          // product_url: productImage + filename,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.Product.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  insertProduct: async (req, res) => {
    try {
      const { productName, harga, stock, categoryId } = req.body;
      await db.Product.create({
        productName,
        harga,
        stock,
        categoryId,
      });
      return await db.Product.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await db.Product.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.Product.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = productController;
