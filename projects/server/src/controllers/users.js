const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const cors = require("cors");
const mailer = require("../lib/mailer");
const dotenv = require("dotenv");
dotenv.config();

const userController = {
  register: async (req, res) => {
    console.log("fvfvfni regis bro");
    try {
      const { user_name, email, password, phone_number } = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      await db.User.create({
        user_name,
        email,
        password: hashPassword,
        phone_number,
      });
      return await db.User.findAll().then((result) => {
        res.send(result);
      });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (user) {
        const cekPass = await bcrypt.compare(
          password,
          user.dataValues.password
        );

        console.log(user.dataValues);
        if (cekPass) {
          const payload = user.dataValues.id;
          const generateToken = nanoid();
          // console.log(payload);

          const token = await db.Token.create({
            token: generateToken,
            payload: JSON.stringify(payload),
            expired: moment().add(1, "days").format(),
            valid: true,
            status: "LOGIN",
          });
          return res.status(200).send({
            message: "Login Berhasil",
            token: token.dataValues.token,
            value: user,
          });
        } else {
          res.status(500).send({ message: "Pssword Salah" });
        }
      } else {
        throw new Error("Login gagal, Email Anda tidak ditemukan.");
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  getUser: async (req, res) => {
    console.log("ini coba");
    try {
      const { getall } = req.query;
      const user = await db.User.findOne({
        where: {
          [Op.or]: [{ email: getall }, { user_name: getall }, { role: getall }],
        },
      });
      return res.status(200).send(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send({ message: err.message });
    }
  },

  getIdByToken: async (req, res, next) => {
    try {
      const { token } = req.query;
      const findToken = await db.Token.findOne({
        where: {
          token,
          expired: {
            [Op.gte]: moment().format(),
          },
          valid: true,
        },
      });

      if (!findToken) {
        throw new Error("token expired");
      }
      const user = await db.User.findOne({
        where: {
          id: JSON.parse(findToken.dataValues.payload).id,
        },
      });
      delete user.dataValues.password;
      req.user = user.dataValues;
      next();
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  getUserByToken: async (req, res) => {
    res.status(200).send(req.user);
  },

  verifyEmail: async (req, res) => {
    try {
      const { email } = req.query;
      const user = await db.User.findOne({
        where: {
          email: email,
        },
      });

      if (user.dataValues) {
        await db.Token.update(
          {
            valid: false,
          },
          {
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              status: "VERIFY",
            },
          }
        );
        const payload = {
          id: user.dataValues.id,
        };
        const generateToken = nanoid();
        const tokens = await db.Token.create({
          token: generateToken,
          expired: moment().add(1, "days").format(),
          status: "VERIFY",
          payload: JSON.stringify(payload),
        });

        await mailer({
          subject: "VERIFIKASI AKUN",
          to: user.dataValues.email,
          html: `<h1>Please click the following link to verify your account:</h1>
                    <a href="${
                      process.env.url_verify + tokens.token
                    }">Klik disini</a>`,
        });
      }
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  },

  successVerif: async (req, res) => {
    try {
      const { token } = req.query;
      const { id } = req.user;

      await db.User.update(
        {
          verification: true,
        },
        {
          where: {
            id: id,
          },
        }
      );

      await db.Token.update(
        {
          valid: false,
        },
        {
          where: {
            token: token,
            status: "VERIFY",
          },
        }
      );

      await db.User.findOne({
        where: {
          id: id,
        },
      }).then((result) => {
        res.send(result);
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = userController;
