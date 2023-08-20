const db = require("../models");
const Sequelize = require("sequelize");
const { Op } = db.Sequelize;
const moment = require("moment");
const { query } = require("express");
const { createStockHistory } = require("../service/stock.service");
const stockControllerB = {
  getAllStock: async (req, res) => {
    try {
      const { nearestBranch } = req.query;

      let stockQueryOptions = {
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
            include: [
              {
                model: db.Category,
                as: "Category",
                attributes: ["category_name"],
              },
            ],
          },
          {
            model: db.Discount,
            as: "Discount",
            attributes: ["nominal", "title", "valid_start", "valid_to"],
          },
        ],
      };

      if (nearestBranch) {
        stockQueryOptions.where = {
          branch_id: nearestBranch,
        };
      }

      const stocks = await db.Stock.findAll(stockQueryOptions);
      res.send(stocks);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  getAllStockAdmin: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const page = req.query.page - 1 || 0;
      const search = req.query.search || "";
      const branch_id = req.query.branch_id;
      let whereClause = {};
      if (req.query.search) {
        whereClause[Op.or] = [
          { "$Product.product_name$": { [Op.like]: `%${search}%` } },
          { "$Product.desc$": { [Op.like]: `%${search}%` } },
          {
            "$Product.Category.category_name$": {
              [Op.like]: `%${search}%`,
            },
          },
        ];
      }
      if (req.query.branch_id) {
        whereClause.branch_id = req.query.branch_id;
      }
      const stockAdmin = await db.Stock.findAndCountAll({
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
            include: [
              {
                model: db.Category,
                as: "Category",
                attributes: ["category_name"],
              },
            ],
          },
          {
            model: db.Discount,
            as: "Discount",
            attributes: ["nominal", "title", "valid_start", "valid_to"],
          },
        ],
        where: whereClause,
        limit: 8,
        offset: 8 * page,
      });

      await trans.commit(); // Move the commit after successful operation
      return res.status(200).send({
        message: "OK",
        result: stockAdmin.rows,
        total: Math.ceil(stockAdmin.count / 8),
      });
    } catch (err) {
      await trans.rollback(); // Rollback only if an error occurs
      res.status(500).send({
        message: err.message,
      });
    }
  },

  searchStock: async (req, res) => {
    try {
      const { search_query, branch_id } = req.query;
      console.log("s", search_query);
      console.log(branch_id);

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
            branch_id: branch_id,
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
          where: {
            branch_id: branch_id,
          },
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
      const { quantity_stock, product_id, branch_id } = req.body;
      const input = {
        quantity_before: 0,
        status: "INCREMENT",
        status_quantity: quantity_stock,
        quantity_after: quantity_stock,
        feature: "ADDED BY ADMIN BRANCH",
      };

      const stock = await db.Stock.create(
        {
          quantity_stock: parseInt(quantity_stock),
          product_id: parseInt(product_id),
          branch_id: parseInt(branch_id),
        },
        {
          transaction: trans,
        }
      );
      await trans.commit();
      const isStockHistoryCreated = await createStockHistory(stock, input);
      if (isStockHistoryCreated) {
        return await db.Stock.findAll().then((result) => {
          res.send(result);
        });
      } else {
        return res.status(500).send({
          message: "Error creating StockHistory.",
        });
      }
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
      const { quantity_stock, status, quantity_before, status_quantity } =
        req.body;

      const input = {
        quantity_before,
        status,
        status_quantity,
        quantity_after: quantity_stock,
        feature: "UPDATED BY ADMIN BRANCH",
      };

      const stok = await db.Stock.findOne({
        where: {
          id: req.params.id,
        },
      });

      const qty_stok = quantity_stock
        ? quantity_stock
        : stok.dataValues.quantity_stock;

      const stockUpdate = await db.Stock.update(
        {
          quantity_stock: qty_stok,
        },
        {
          where: {
            id: req.params.id,
          },
          transaction: trans,
        }
      );

      await trans.commit();
      const isStockHistoryCreated = await createStockHistory(stok, input);
      if (isStockHistoryCreated) {
        return await db.Stock.findOne({
          where: {
            id: req.params.id,
          },
        }).then((result) => res.send(result));
      } else {
        return res.status(500).send({
          message: "Error creating StockHistory.",
        });
      }
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
      const { quantity_before } = req.query;
      const input = {
        quantity_before,
        status: "DECREMENT",
        status_quantity: quantity_before,
        quantity_after: 0,
        feature: "DELETED BY ADMIN BRANCH",
      };

      const stok = await db.Stock.findOne({
        where: {
          id: req.params.id,
        },
      });

      const isStockHistoryCreated = await createStockHistory(stok, input);
      if (isStockHistoryCreated) {
        await db.Stock.destroy({
          where: {
            //  id: req.params.id
            //   [Op.eq]: req.params.id
            id: req.params.id,
          },
        });
        await trans.commit();
        return await db.Stock.findAll().then((result) => res.send(result));
      } else {
        return res.status(500).send({
          message: "Error creating StockHistory.",
        });
      }
    } catch (err) {
      console.log(err.message);
      await trans.rollback();
      return res.status(500).send({
        error: err.message,
      });
    }
  },

  getAllStockByCategory: async (req, res) => {
    try {
      const { category_name, branch_id } = req.query;
      const get = await db.Stock.findAll({
        where: {
          branch_id: branch_id,
        },
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
            include: [
              {
                model: db.Category,
                as: "Category",
                attributes: ["category_name"],
                where: {
                  category_name: category_name,
                },
              },
            ],
          },
          {
            model: db.Discount,
            as: "Discount",
            attributes: ["nominal", "title", "valid_start", "valid_to"],
          },
        ],
      });
      const filteredData = get.filter((item) => {
        return item.Product?.Category?.category_name === category_name;
      });
      res.send(filteredData);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },

  getStockByCategory: async (req, res) => {
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

  getStockHistory: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const page = req.query.page - 1 || 0;
      const search = req.query.search || "";
      const branch_id = req.query.branch_id;
      let whereClause = {};
      if (req.query.search) {
        whereClause[Op.or] = [
          { "$Stock.Product.product_name$": { [Op.like]: `%${search}%` } },
          { "$Stock.Product.desc$": { [Op.like]: `%${search}%` } },
          {
            "$Stock.Product.Category.category_name$": {
              [Op.like]: `%${search}%`,
            },
          },
        ];
      }
      if (req.query.branch_id) {
        whereClause[Op.and] = [
          {
            "$Stock.branch_id$": req.query.branch_id,
          },
        ];
      }
      console.log("whereClause", whereClause);
      const stockHistory = await db.StockHistory.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: db.Stock,
            as: "Stock",
            attributes: ["id", "quantity_stock"],
            paranoid: false,
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
                include: [
                  {
                    model: db.Category,
                    as: "Category",
                    attributes: ["category_name"],
                  },
                ],
              },
              {
                model: db.Branch,
                as: "Branch",
                attributes: ["id", "branch_name"],
              },
            ],
          },
        ],
        where: whereClause,
        limit: 8,
        offset: 8 * page,
      });

      await trans.commit(); // Move the commit after successful operation
      return res.status(200).send({
        message: "OK",
        result: stockHistory.rows,
        total: Math.ceil(stockHistory.count / 10),
      });
    } catch (err) {
      await trans.rollback(); // Rollback only if an error occurs
      res.status(500).send({
        message: err.message,
      });
    }
  },
};
module.exports = stockControllerB;
