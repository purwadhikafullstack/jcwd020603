const db = require("../models");

const voucherController = {
  getAllVoucher: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const fetch = await db.Voucher.findAll();
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
      console.log("QUERY LIMIT", limit);
      const newLimit = limit - 1;
      console.log("INI LIMIT", newLimit);
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


  getAll: async (req, res) => {
    try {
      const fetchVoucher = await db.Voucher.findAll();
      res.status(200).send({ message: "Ini data voucher", data: fetchVoucher });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  addVoucher: async (req, res) => {
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
      });
      res.status(200).send({
        message: "Data voucher berhasil ditambahkan",
        data: tambahVoucher,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  updateVoucher: async (req, res) => {
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
      res
        .status(200)
        .send({ message: "Data voucher berhasil diubah", data: editVoucher });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  deleteVoucher: async (req, res) => {
    try {
      const { id } = req.body;
      const hapusVoucher = await db.Voucher.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).send({ message: "Data Voucher berhasil di hapus" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = voucherController;
