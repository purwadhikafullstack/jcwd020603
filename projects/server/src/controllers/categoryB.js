const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const category_image = process.env.category_image;

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
      const { category_name } = req.body;
      // const { filename } = req.file;
      const kategori = await db.Category.findOne({
        where: {
          id: req.params.id,
        },
      });
      // console.log(kategori);
      const cat_nm = category_name
        ? category_name
        : kategori.dataValues.category_name;
      const cat_img = req.file
        ? category_image + req.file.filename
        : kategori.dataValues.photo_category_url;
      await db.Category.update(
        {
          category_name: cat_nm,
          photo_category_url: cat_img,
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
      const { category_name } = req.body;
      // console.log(req.body);
      const { filename } = req.file;
      console.log(req.file);
      await db.Category.create({
        category_name,
        photo_category_url: category_image + filename,
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
