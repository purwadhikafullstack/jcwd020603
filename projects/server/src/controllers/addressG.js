const db = require("../models");
const { openCage } = require("../service/location.service");

const addressController = {
  addAddress: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const {
        address,
        district,
        city_id,
        province,
        address_name,
        address_phone,
      } = req.body;
      const checkAddress = await db.Address.findOne({
        where: {
          user_id: req.user.id,
          address_name: address_name,
        },
      });
      if (!checkAddress) {
        const coordinate = await openCage(req.body);
        console.log(coordinate.data.results[0].geometry);
        await db.Address.create(
          {
            address: address,
            district: district,
            city_id: city_id,
            province: province,
            user_id: req.user.id,
            address_name: address_name,
            address_phone: address_phone,
            latitude: coordinate.data.results[0].geometry.lat,
            longitude: coordinate.data.results[0].geometry.lng,
          },
          { transaction: trans }
        );
        const jumlahAlamat = await db.Address.count({
          where: {
            user_id: req.user.id,
          },
        });
        console.log(jumlahAlamat);
        if (jumlahAlamat == 0) {
          await db.Address.update(
            {
              is_primary: true,
            },
            {
              where: {
                user_id: req.user.id,
              },
              transaction: trans,
            }
          );
        }
        await trans.commit();
        return res.status(200).send({ message: "alamat berhasil di tambah" });
      } else {
        await trans.rollback();
        return res.status(404).send({ message: "nama alamat sudah terdaftar" });
      }
    } catch (err) {
      await trans.rollback();
      return res.status(500).send({
        message: err.message,
      });
    }
  },

  getAllAddress: async (req, res) => {
    try {
      const get = await db.Address.findAll({
        where: {
          user_id: req.user.id,
        },
        include: [
          {
            model: db.City,
            as: "City",
            attributes: ["type", "city_name", "province", "postal_code"],
          },
        ],
      });
      return res.send({
        message: "OK",
        result: get,
      });
    } catch (err) {
      return res.status.send({
        message: err.message,
      });
    }
  },
  editAddress: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const {
        address,
        district,
        city_id,
        province,
        address_name,
        address_phone,
      } = req.body;
      const checkAddress = await db.Address.findOne({
        where: {
          user_id: req.user.id,
          address_name: address_name,
        },
      });
      if (!checkAddress || checkAddress.id === Number(req.params.id)) {
        const alamat = await db.Address.findOne({
          where: {
            id: req.params.id,
          },
        });
        const ad = address ? address : alamat.dataValues.address;
        const dis = district ? district : alamat.dataValues.district;
        const ct = city_id ? city_id : alamat.dataValues.city;
        const pro = province ? province : alamat.dataValues.province;
        const ad_nm = address_name
          ? address_name
          : alamat.dataValues.address_name;
        const ad_ph = address_phone
          ? address_phone
          : alamat.dataValues.address_phone;

        const coordinate = await openCage({
          address: ad,
          district: dis,
          city: ct,
          province: pro,
        });
        const updateAddress = await db.Address.update(
          {
            address: ad,
            district: dis,
            city_id: ct,
            province: pro,
            user_id: req.user.id,
            address_name: ad_nm,
            address_phone: ad_ph,
            latitude: coordinate.data.results[0].geometry.lat,
            longitude: coordinate.data.results[0].geometry.lng,
          },
          {
            where: { id: req.params.id },
            transaction: trans,
          }
        );
        await trans.commit();
        return res.status(200).send({
          message: "data berhasil diedit",
          result: updateAddress,
        });
      } else {
        await trans.rollback();
        return res.status(404).send({
          message: "nama alamat sudah terdaftar",
        });
      }
    } catch (err) {
      await trans.rollback();
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  deleteAddress: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const checkPrimary = await db.Address.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (checkPrimary.is_primary) {
        return res.status(400).send({
          message: "Alamat utama tidak bisa dihapus",
        });
      }
      await db.Address.destroy({
        where: {
          id: req.params.id,
        },
        transaction: trans,
      });
      await trans.commit();
      return res.send({
        message: "alamat berhasil dihapus",
      });
    } catch (err) {
      await trans.rollback();
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  updatePrimary: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const find = await db.Address.findOne({
        where: {
          is_primary: true,
          user_id: req.user.id,
        },
      });
      if (find) {
        await db.Address.update(
          {
            is_primary: false,
          },
          {
            where: {
              is_primary: true,
              user_id: req.user.id,
            },
            transaction: trans,
          }
        );
      }
      const up = await db.Address.update(
        {
          is_primary: true,
        },
        {
          where: {
            id: req.params.id,
            is_primary: false,
            user_id: req.user.id,
          },
          transaction: trans,
        }
      );
      console.log(up);
      await trans.commit();
      return res.send({
        message: "alamat utama berhasil diedit",
      });
    } catch (err) {
      await trans.rollback();
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  updateCurrent: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const current = await db.Address.findOne({
        where: {
          current_address: true,
          user_id: req.user.id,
        },
      });
      if (current) {
        await db.Address.update(
          {
            current_address: false,
          },
          {
            where: {
              current_address: true,
              id: current.id,
              user_id: req.user.id,
            },
          }
        );
      }
      const find = await db.Address.update(
        {
          current_address: true,
        },
        {
          where: {
            id: req.params.id,
            current_address: false,
            user_id: req.user.id,
          },
          transaction: trans,
        }
      );
      await trans.commit();
      return res.status(200).send({
        message: "OK",
        result: find,
      });
    } catch (err) {
      await trans.rollback();
      return res.status(500).send({
        message: err.message,
      });
    }
  },
  getCurrent: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const getOne = await db.Address.findOne({
        where: {
          current_address: true,
          user_id: req.user.id,
        },
        include: [
          {
            model: db.City,
            as: "City",
            attributes: ["type", "city_name", "province", "postal_code"],
          },
        ],
      });
      await trans.commit();
      res.status(200).send({
        message: "OK",
        result: getOne,
      });
    } catch (err) {
      await trans.rollback();
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getPrimary: async (req, res) => {
    const trans = await db.sequelize.transaction();
    try {
      const getOne = await db.Address.findOne({
        where: {
          is_primary: true,
          user_id: req.user.id,
        },
        include: [
          {
            model: db.City,
            as: "City",
            attributes: ["type", "city_name", "province", "postal_code"],
          },
        ],
      });
      await trans.commit();
      res.status(200).send({
        message: "OK",
        result: getOne,
      });
    } catch (err) {
      await trans.rollback();
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = addressController;
