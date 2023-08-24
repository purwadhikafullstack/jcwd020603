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

  getAllAdmin: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const page = req.query.page - 1 || 0;
      const search = req.query.search || "";
      let whereClause = {};
      if (req.query.search) {
        whereClause[Op.or] = [{ category_name: { [Op.like]: `%${search}%` } }];
      }
      const category = await db.Category.findAndCountAll({
        where: whereClause,
        limit: 4,
        offset: 4 * page,
      });
      await trans.commit();
      return res.status(200).send({
        message: "OK",
        result: category.rows,
        total: Math.ceil(category.count / 4),
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
      const selector = await db.Category.findAll();
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
      const category = await db.Category.findOne({
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
  insertCategory: async (req, res) => {
    const trans = await db.sequelize.transaction();

    try {
      const { category_name } = req.body;
      const { filename } = req.file;

      await db.Category.create(
        {
          category_name,
          photo_category_url: category_image + filename,
        },
        {
          transaction: trans,
        }
      );
      await trans.commit();
      return await db.Category.findAll().then((result) => {
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

  editCategory: async (req, res) => {
    const trans = await db.sequelize.transaction();

    try {
      const { category_name } = req.body;
      // const { filename } = req.file;
      const kategori = await db.Category.findOne({
        where: {
          id: req.params.id,
        },
      });
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
          transaction: trans,
        }
      );
      await trans.commit();
      return await db.Category.findOne({
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

  deleteCategory: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      await db.Category.destroy({
        where: {
          //  id: req.params.id
          //   [Op.eq]: req.params.id
          id: req.params.id,
        },
        transaction: trans,
      });
      await trans.commit();
      return await db.Category.findAll().then((result) => res.send(result));
    } catch (err) {
      console.log(err.message);
      await trans.rollback();
      return res.status(500).send({
        error: err.message,
      });
    }
  },
};

module.exports = categoryController;
