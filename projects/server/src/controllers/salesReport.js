const { Op } = require("sequelize");
const db = require("../models");
const moment = require("moment");

const salesReportController = {
  getAll: async (req, res) => {
    const { dateFrom, dateTo, branch_id, search } = req.body;
    let where = {
      status: { [Op.or]: ["Dikirim", "Pesanan Dikonfirmasi"] },
      createdAt: { [Op.between]: [dateFrom, dateTo] },
    };
    if (branch_id) {
      where.branch_id = branch_id;
    }
    if (search) {
      where[Op.or] = [{ order_number: { [Op.like]: `%${search}%` } }];
    }
    try {
      const dtTrans = await db.Order.findAll({
        where: where,
        include: [
          {
            model: db.Branch,
            as: "Branch",
            attributes: [
              "branch_name",
              "branch_address",
              "district",
              "city_id",
              "province",
            ],
            include: [
              {
                model: db.City,
                as: "City",
                attributes: ["city_name", "type", "postal_code"],
              },
            ],
          },
          {
            model: db.Address,
            as: "Address",
            attributes: [
              "address",
              "district",
              "Province",
              "user_id",
              "city_id",
            ],
          },
          {
            model: db.User,
            as: "User",
            attributes: ["user_name", "branch_id"],
          },
        ],
      });
      res.status(200).send({ message: "data trans", data: dtTrans });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  getAllFiltering: async (req, res) => {
    const { dateFrom, dateTo, branch_id, sort, order, page, search } = req.body;
    let where = {
      status: { [Op.or]: ["Dikirim", "Pesanan Dikonfirmasi"] },
      createdAt: { [Op.between]: [dateFrom, dateTo] },
    };
    if (dateFrom && dateTo) {
      where.createdAt = { [Op.between]: [dateFrom, dateTo] };
    }
    if (branch_id !== "") {
      where.branch_id = branch_id;
    }
    if (search) {
      where[Op.or] = [{ order_number: { [Op.like]: `%${search}%` } }];
    }
    try {
      const dtTransFilter = await db.Order.findAndCountAll({
        where: where,
        include: [
          {
            model: db.Branch,
            as: "Branch",
            attributes: [
              "branch_name",
              "branch_address",
              "district",
              "city_id",
              "province",
            ],
            include: [
              {
                model: db.City,
                as: "City",
                attributes: ["city_name", "type", "postal_code"],
              },
            ],
          },
          {
            model: db.Address,
            as: "Address",
            attributes: [
              "address",
              "district",
              "Province",
              "user_id",
              "city_id",
            ],
          },
          {
            model: db.User,
            as: "User",
            attributes: ["user_name", "branch_id"],
          },
        ],

        order: [[sort, order]],
        limit: 3,
        offset: 3 * page,
      });
      const count = await db.Order.count();
      console.log(dtTransFilter, "ini response  nya");
      res.status(200).send({
        message: "data trans",
        data: dtTransFilter.rows,
        total: Math.ceil(dtTransFilter.count / 3),
        count: count,
      });
    } catch (error) {
      res.status(500).send({ message: error.message, pesan: "masuk sini" });
    }
  },

  allDataOrder: async (req, res) => {
    try {
      const dtTransByDate = await db.Order.findAll({
        where: {
          status: { [Op.or]: ["Dikirim", "Pesanan Dikonfirmasi"] },
        },
        include: [
          {
            model: db.Branch,
            as: "Branch",
            attributes: [
              "branch_name",
              "branch_address",
              "district",
              "city_id",
              "province",
            ],
            include: [
              {
                model: db.City,
                as: "City",
                attributes: ["city_name", "type", "postal_code"],
              },
            ],
          },
          {
            model: db.Address,
            as: "Address",
            attributes: [
              "address",
              "district",
              "Province",
              "user_id",
              "city_id",
            ],
          },
          {
            model: db.User,
            as: "User",
            attributes: ["user_name", "branch_id"],
          },
        ],
      });
      res.status(200).send({ message: "data trans", data: dtTransByDate });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = salesReportController;
