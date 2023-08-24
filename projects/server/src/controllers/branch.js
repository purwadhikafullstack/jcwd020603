const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const cors = require("cors");
const mailer = require("../lib/mailer");
const dotenv = require("dotenv");
const { openCage } = require("../service/location.service");
dotenv.config();

const branchController = {
  getAll: async (req, res) => {
    try {
      const branch = await db.User.findAll({
        where: {
          role: "ADMIN",
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
        ],
      });
      res.status(200).send({ message: "List Branches", Data: branch });
      return branch;
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  getbyAll: async (req, res) => {
    try {
      const { getAll } = req.query;
      const haveBranch = await db.Branch.findOne({
        where: {
          [Op.or]: [{ branch_name: getAll }, { branch_address: getAll }],
        },
      });
      res.status(200).send({ message: "Data ditemukan", Data: haveBranch });
      return haveBranch;
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  addBranchAdmin: async (req, res) => {
    try {
      const {
        user_name,
        email,
        password,
        phone_number,
        branch_name,
        address,
        district,
        city_id,
        province,
      } = req.body;
      console.log(req.body, "req bodynya admin bbranch");
      const hashedPass = await bcrypt.hash(password, 10);
      const coordinate = await openCage(req.body);
      console.log(coordinate);
      const newBranch = await db.Branch.create({
        branch_name,
        branch_address: address,
        district,
        city_id,
        province,
        latitude: coordinate.data.results[0].geometry.lat,
        longitude: coordinate.data.results[0].geometry.lng,
      });
      const newAdmin = await db.User.create({
        user_name,
        email,
        role: "ADMIN",
        password: hashedPass,
        phone_number,
        branch_id: newBranch.id,
      });
      return res.status(200).send({
        message: "Data Admin dan Cabang berhasil ditambahkan",
        Data: newBranch,
        newAdmin,
      });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  deleteBranchAdmin: async (req, res) => {
    // const updateData = await getAll()
    const { branch_id } = req.body;
    console.log("sini", req.body);
    const transaction = await db.sequelize.transaction();
    try {
      await db.User.destroy({
        where: {
          role: "ADMIN",
          branch_id: branch_id,
        },
        transaction,
      });

      const cekUser = await db.User.count({
        where: {
          branch_id: branch_id,
          role: "ADMIN",
        },
        transaction,
      });

      if (cekUser === 0) {
        await db.Branch.destroy({
          where: {
            id: branch_id,
          },
          transaction,
        });
      }

      await transaction.commit();
      res.status(200).send({ message: "Admin dan Branch berhasil dihapus" });
    } catch (error) {
      await transaction.rollback();
      res.status(500).send({ message: error.message });
    }
  },

  updateAdminBranch: async (req, res) => {
    const {
      user_name,
      email,
      password,
      phone_number,
      branch_name,
      address,
      district,
      city_id,
      city_name,
      province,
      branch_id,
      user_id,
    } = req.body;
    console.log(req.body);
    const transaction = await db.sequelize.transaction();
    const hashedPass = await bcrypt.hash(password, 10);
    try {
      const branch = await db.User.findOne({
        where: {
          branch_id: branch_id,
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
        ],
      });

      await db.User.update(
        {
          user_name,
          email,
          password: hashedPass,
          phone_number,
        },
        {
          where: {
            branch_id: branch_id,
          },
        },
        transaction
      );

      await db.Branch.update(
        {
          branch_name,
          branch_address,
          district,
          city_id,
          province,
        },
        {
          where: {
            id: branch_id,
          },
        },
        transaction
      );

      await db.Branch.update(
        {
          branch_name,
          branch_address: address,
          district,
          city_id,
          province,
        },
        {
          where: {
            id: branch_id,
          },
        },
        transaction
      );

      await transaction.commit();
      res.status(200).send({ message: "Admin dan Branch berhasil di edit" });
    } catch (error) {
      await transaction.rollback();
      res.status(500).send({ message: error.message });
    }
  },

  getAllBranchName: async (req, res) => {
    try {
      const branch = await db.Branch.findAll();
      return res.send(branch);
    } catch (err) {}
    console.log(err.message);
  },

  getSelector: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const selector = await db.Branch.findAll();
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

  getSelectorCategory: async (req, res) => {
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

  getSelectorFeature: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const selector = await db.StockHistory.findAll({
        attributes: ["feature"],
        group: ["feature"],
      });

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
};

module.exports = branchController;
