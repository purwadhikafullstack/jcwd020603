const { Op } = require("sequelize");
const db = require("../models");

const voucherController = {
  getAllVoucher: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const fetch = await db.Voucher.findAll({
        where: {
          branch_id: req.query.branch_id,
        },
      });
      await trans.commit();
      res.send({
        message: "OK",
        result: fetch,
      });
    } catch (err) {
      await trans.rollback();
      res.status(500).send({
        message: err.message,
      });
    }
  },
  updateLimit: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const { limit } = req.query;
      const newLimit = limit - 1;
      const patch = await db.Voucher.update(
        {
          limit: newLimit,
        },
        {
          where: { id: req.params.id },
          transaction: trans,
        }
      );
      await trans.commit();
      res.send({
        message: "OK",
        result: patch,
      });
    } catch (err) {
      await trans.rollback();
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getAllFilter: async (req, res) => {
    const trans = await db.sequelize.transaction();
    const { branch_id, sort, ordering, search, page } = req.body;
    let order = [];
    if (sort === "valid_start") {
      order = [[sort, ordering]];
    } else if (sort === "valid_to") {
      order = [[sort, ordering]];
    } else if (sort === "nominal") {
      order = [[sort, ordering]];
    }

    let where = {};
    if (branch_id) {
      where.branch_id = branch_id;
    }

    if (search) {
      where[Op.or] = [
        { $title$: { [Op.like]: `%${search}%` } },
        { $valid_start$: { [Op.like]: `%${search}%` } },
        { $valid_to$: { [Op.like]: `%${search}%` } },
        { $nominal$: { [Op.like]: `%${search}%` } },
        { $voucher_code$: { [Op.like]: `%${search}%` } },
      ];
    }
    try {
      const fetchVoucher = await db.Voucher.findAndCountAll({
        where: where,
        order: order,
        limit: 3,
        offset: 3 * page,
      });
      await trans.commit();
      res.status(200).send({
        message: "Ini data voucher",
        Data: fetchVoucher.rows,
        total: Math.ceil(fetchVoucher.count / 3),
        jumlah_data: fetchVoucher.count,
      });
    } catch (error) {
      await trans.rollback();
      res.status(500).send({ message: error.message });
    }
  },

  getAll: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const fetchVoucher = await db.Voucher.findAll();
      await trans.commit();
      res.status(200).send({ message: "Ini data voucher", data: fetchVoucher });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  addVoucher: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const {
        title,
        voucher_code,
        valid_start,
        valid_to,
        nominal,
        minimal_order,
        limit,
        desc,
        branch_id,
      } = req.body;
      const tambahVoucher = await db.Voucher.create({
        title,
        voucher_code,
        valid_start,
        valid_to,
        nominal,
        minimal_order,
        limit,
        desc,
        branch_id,
      });
      await trans.commit();
      res.status(200).send({
        message: "Data voucher berhasil ditambahkan",
        data: tambahVoucher,
      });
    } catch (error) {
      await trans.rollback();
      res.status(500).send({ message: error.message });
    }
  },

  updateVoucher: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const {
        id,
        title,
        voucher_code,
        valid_start,
        valid_to,
        nominal,
        minimal_order,
        limit,
        desc,
        branch_id,
      } = req.body;
      const editVoucher = await db.Voucher.update(
        {
          nominal,
          minimal_order,
          limit,
          desc,
        },
        {
          where: {
            id: id,
          },
        }
      );
      await trans.commit();
      res
        .status(200)
        .send({ message: "Data voucher berhasil diubah", data: editVoucher });
    } catch (error) {
      await trans.rollback();
      res.status(500).send({ message: error.message });
    }
  },

  deleteVoucher: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const { id } = req.body;
      const hapusVoucher = await db.Voucher.destroy({
        where: {
          id: id,
        },
      });
      await trans.commit();
      res.status(200).send({ message: "Data Voucher berhasil di hapus" });
    } catch (error) {
      await trans.rollback();
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = voucherController;
