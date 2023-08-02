const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const cors = require("cors");
const mailer = require("../lib/mailer");
const dotenv = require("dotenv");
dotenv.config();

const branchController = {
  getAll: async (req, res) => {
    try {
      const {role} = req.body
      const branch = await db.User.findAll({
        where : {
          role : "ADMIN"
        },
        include: [
          {
            model: db.Branch,
            as: "Branch",
            attributes: ["branch_name", "branch_address", "district", "city_id", "province" ],
          },
        ],
      });
      res.status(200).send({ message: "List Branches", Data : branch });
      return branch
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
  getbyAll : async (req,res) => {
    try {
      const {getAll} = req.query
      const haveBranch = await db.Branch.findOne({
        where : {
          [Op.or] : [{branch_name : getAll},{branch_address : getAll}]
        }
      })
       res.status(200).send({message : "Data ditemukan", Data : haveBranch})
       return haveBranch
      
    } catch (error) {
      res.status(500).send({message : error.message})
    }
  },


  addBranchAdmin : async (req, res) => {
    try {

    const {user_name, email, password, phone_number, branch_name, branch_address, district, city_id, province} = req.body
    const hashedPass =  await bcrypt.hash(password, 10) 
    const newBranch = await db.Branch.create({branch_name, branch_address, district, city_id, province})
     const newAdmin = await db.User.create({user_name, email, role : "ADMIN", password : hashedPass, phone_number, branch_id : newBranch.id})
     return res.status(200).send({message : "Data Admin dan Cabang berhasil ditambahkan", Data : newBranch, newAdmin})
      
    } catch (error) {
      res.status(500).send({message : error.message})
    }
  },

  delteBranchAdmin : async (req,res) => {
    // const updateData = await getAll()
    const {user_id, branch_id} = req.body
    const transaction = await db.sequelize.transaction()
    try {
      await db.User.destroy({
        where : {
          id : user_id,
          role : "ADMIN",
          branch_id : branch_id
        },
        transaction
      })

      const cekUser = await db.User.count({
        where : {
          branch_id : branch_id,
          role : "ADMIN"
        },
        transaction
      })

      if (cekUser === 0) {
        await db.Branch.destroy({
          where : {
            id : branch_id
          },
            transaction
        })
      }

     await transaction.commit()
     res.status(200).send({message : "Admin dan Branch berhasil dihapus"})
    } catch (error) {
      await transaction.rollback()
      res.status(500).send({message : error.message})
    }
  }
};

module.exports = branchController;
