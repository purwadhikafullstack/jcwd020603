const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const categoryController = {
  getAll: async (req, res) => {
    try {
      const category = await db.Category.findAll();
      return res.send(category);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getById: async (req, res) => {
    try {
      const category = await db.db.Category.findOne({
        where: {
          id: req.params.id,
        },
      });
      return res.send(category);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        message: err.message,
      });
    }
  },
  editCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      await db.Category.update(
        {
          categoryName,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      return await db.Category.findOne({
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
  insertCategory: async (req, res) => {
    try {
      const { categoryName } = req.body;
      await db.Category.create({
        categoryName,
      });
      return await db.Category.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      console.log(err);
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      await db.Category.destroy({
        where: {
          //  id: req.params.id

          //   [Op.eq]: req.params.id

          id: req.params.id,
        },
      });
      return await db.Category.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = categoryController;
