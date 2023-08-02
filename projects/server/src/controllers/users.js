const db = require("../models");
const { Op } = require("sequelize");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");
const moment = require("moment");
const cors = require("cors");
const mailer = require("../lib/mailer");
const dotenv = require("dotenv");
dotenv.config();
const url_avatar = process.env.avatar_url;
const url_bg = process.env.bg_url;

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

        // console.log(user.dataValues);
        if (cekPass) {
          const payload = user.dataValues.id;
          const generateToken = nanoid();
          // console.log(payload);

          const cektok = await db.Token.findOne({
            where: {
              payload: JSON.stringify({ id: user.dataValues.id }),
              status: "LOGIN",
            },
          });
          console.log(cektok);
          if (cektok) {
            const token = await db.Token.update(
              {
                token: generateToken,
                expired: moment().add(1, "days").format(),
              },
              {
                where: {
                  id: cektok.dataValues.id,
                },
              }
            );
            return res.status(200).send({
              message: "Login Berhasil",
              token: generateToken,
              value: user,
            });
          } else {
            const token = await db.Token.create({
              token: generateToken,
              payload: JSON.stringify({ id: payload }),
              expired: moment().add(1, "days").format(),
              valid: true,
              status: "LOGIN",
            });
            return res.status(200).send({
              message: "Login Berhasil",
              token: generateToken,
              value: user,
            });
          }
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

  getAllRoleAdmin: async (req, res) => {
    try {
      const user = await db.User.findAll({
        where: {
          role: {
            [Op.or]: ["ADMIN", "SUPER ADMIN"],
          },
        },
      });
      res.status(200).send({ message: "list Admin", data: user });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  getUser: async (req, res) => {
    // console.log("ini coba");
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
          [Op.and]: [
            { token },

            {
              expired: {
                [Op.gt]: moment().format(),
                [Op.lte]: moment().add(1, "d").format(),
              },
            },
            { valid: true },
          ],
        },
      });

      console.log(findToken);

      if (!findToken) {
        throw new Error("token expired");
      }
      const user = await db.User.findOne({
        where: {
          id: JSON.parse(findToken?.dataValues?.payload).id,
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

  uploadAvatar: async (req, res) => {
    try {
      const { filename } = req.file;
      await db.User.update(
        {
          avatar_url: url_avatar + filename,
          bg_url: url_bg + filename,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      );

      await db.User.findOne({
        where: {
          id: req.params.id,
        },
      }).then((result) => res.send(result));
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  },

  editUser: async (req, res) => {
    try {
      const { user_name, email, gender, birth_date } = req.body;
      await db.User.update(
        {
          user_name,
          email,
          gender,
          birth_date,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((result) =>
        res.status(200).send({
          message: "Perubahan Data Berhasil",
          data: result.dataValues,
        })
      );
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },

  changePass: async (req, res) => {
    try {
      const { password } = req.body;
      const hashpass = await bcrypt.hash(password, 10);

      db.User.update(
        {
          password: hashpass,
        },
        {
          where: {
            id: req.params.id,
          },
        }
      ).then((result) =>
        res.status(200).send({
          message: "Password berhasil diganti",
          data: res.dataValues,
        })
      );
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = userController;
