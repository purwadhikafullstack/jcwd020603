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
            include : [
              {
                model: db.City,
                as : "City",
                attributes : [
                  "city_name",
                  "type",
                  "postal_code"
                ]
              }
            ]
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
      // console.log(req.body);
      const hashedPass = await bcrypt.hash(password, 10);
      const coordinate = await openCage(req.body);
      console.log(coordinate);
      const newBranch = await db.Branch.create({
        branch_name,
        branch_address : address,
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
      return res
        .status(200)
        .send({
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
    const { branch_id} = req.body;
    console.log("sini",req.body);
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


  updateAdminBranch : async (req, res)=> {
    const {
      user_name,
      email,
      password,
      phone_number,
      branch_name,
      branch_address,
      district,
      city_id,
      city_name,
      province,
      branch_id,
      user_id
    } = req.body;
    console.log(req.body);
    const transaction = await db.sequelize.transaction()
    try {
  
      const branch = await db.User.findOne({
        where: {
          branch_id : branch_id,
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
            include : [
              {
                model: db.City,
                as : "City",
                attributes : [
                  "city_name",
                  "type",
                  "postal_code"
                ]
              }
            ]
          },
        ],
      });

     const u_name = user_name ? user_name : branch.dataValues.user_name;
     const u_email = email ? email : branch.dataValues.email;
     const u_phone = phone_number ? phone_number : branch.dataValues.phone_number;
     const b_branch_name = branch_name ? branch_name : branch.Branch.dataValues.branch_name;
     const b_branch_address = branch_address ? branch_address : branch.Branch.dataValues.branch_address;
     const b_district = district ? district : branch.Branch.dataValues.district;
     const c_id = city_id ? city_id : branch.Branch.dataValues.city_id;
     const b_province = province ? province : branch.Branch.dataValues.province;

      await db.User.update({
        user_name,
        email,
        // password,
        phone_number,
      },
      {
        where : {
         branch_id : branch_id
        }
      },
      transaction
      )
      

      await db.Branch.update({
        branch_name,
        branch_address,
        district,
        city_id,
        province,
      },
      {
        where : {
          id : branch_id
        }
      },
      transaction
      )

      await transaction.commit()
      res.status(200).send({message : "Admin dan Branch berhasil di edit"})
    } catch (error) {
      await transaction.rollback()
      res.status(500).send({message : error.message})
    }
  }
};

module.exports = branchController;
