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
  getAllFilter: async (req, res) => {
    const { branch_id, search, sort, ordering, page } = req.body;
    let where = {
      role: "ADMIN",
    };
    if (branch_id) {
      where.branch_id = branch_id;
    }
    if (search) {
      where[Op.or] = [
        { $user_name$: { [Op.like]: `%${search}%` } },
        { "$Branch.branch_name$": { [Op.like]: `%${search}%` } },
      ];
    }
    let order = [];
    if (sort === "user_name") {
      order = [[sort, ordering]];
    }
    if (sort === "branch_name") {
      order = [[{ model: db.Branch, as: "Branch" }, "branch_name", ordering]];
    }
    try {
      const branch = await db.User.findAndCountAll({
        include: [
          {
            model: db.Branch,
            as: "Branch",
            include: [
              {
                model: db.City,
                as: "City",
                attributes: ["city_name", "type", "postal_code"],
              },
            ],
          },
        ],
        where: where,
        order: order,
        limit: 3,
        offset: 3 * page,
      });
      // const noFilterBranch = await db.User.fin
      res.status(200).send({
        message: "List Branches",
        Data: branch.rows,
        total: Math.ceil(branch.count / 3),
        jumlahBranch: branch.count,
      });
      return branch;
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

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

  countBranch: async (req, res) => {
    try {
      const branch = await db.Branch.findAll();
      res.status(200).send({ message: "List Branches", data: branch });
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
    const trans = await db.sequelize.transaction();
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
      const hashedPass = await bcrypt.hash(password, 10);
      const coordinate = await openCage(req.body);
      const newBranch = await db.Branch.create({
        branch_name,
        branch_address: address,
        district,
        city_id,
        province,
        latitude: coordinate.data.results[0].geometry.lat,
        longitude: coordinate.data.results[0].geometry.lng,
      },
      {transaction : trans});
      const newAdmin = await db.User.create({
        user_name,
        email,
        role: "ADMIN",
        password: hashedPass,
        phone_number,
        branch_id: newBranch.id,
      },
      {transaction : trans});
      await trans.commit();
      return res.status(200).send({
        message: "Data Admin dan Cabang berhasil ditambahkan",
        Data: newBranch,
        newAdmin,
      });
    } catch (error) {
      trans.rollback()
      res.status(500).send({ message: error.message });
    }
  },

  deleteBranchAdmin: async (req, res) => {
    const trans = await db.sequelize.transaction();
    const { branch_id } = req.body;
    const transaction = await db.sequelize.transaction();
    try {
      await db.User.destroy({
        where: {
          role: "ADMIN",
          branch_id: branch_id,
        },
        
      });

      const cekUser = await db.User.count({
        where: {
          branch_id: branch_id,
          role: "ADMIN",
        },
       
      });

      if (cekUser === 0) {
        await db.Branch.destroy({
          where: {
            id: branch_id,
          },
          
        });
      }

      await trans.commit();
      res.status(200).send({ message: "Admin dan Branch berhasil dihapus" });
    } catch (error) {
      await trans.rollback();
      res.status(500).send({ message: error.message });
    }
  },

  updateAdminBranch: async (req, res) => {
    const trans = await db.sequelize.transaction();
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
    const hashedPass = await bcrypt.hash(password, 10);
    try {
      const branch = await db.User.findOne({
        where: {
          branch_id: branch_id,
          id: user_id,
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
            id: user_id,
            branch_id: branch_id,
          },
        },
        
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
        
      );
      await trans.commit();
      res.status(200).send({ message: "Admin dan Branch berhasil di edit" });
    } catch (error) {
      await trans.rollback();
      res.status(500).send({ message: error.message });
    }
  },

  getAllBranchName: async (req, res) => {
    try {
      const branch = await db.Branch.findAll();
      return res.send(branch);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
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

  uploadAvatar: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const { filename } = req.file;
      await db.User.update(
        {
          avatar_url: url_avatar + filename,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

     const dtUserOne = await db.User.findOne({
        where: {
          id: req.params.id,
        },
      })
      await trans.commit()
      res.status(200).send({ message: "uoload foto", data: dtUserOne })
    } catch (err) {
      await trans.rollback();
      return res.status(500).send({ message: err.message });
    }
  },
};

module.exports = branchController;
