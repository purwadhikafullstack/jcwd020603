const { default: axios } = require("axios");
const db = require("../models");

const provinceController = {
  addProvinceData: async (req, res) => {
    try {
      const response = await axios.get(
        "https://api.rajaongkir.com/starter/province",
        {
          headers: { key: process.env.RajaOngkir_API_KEY },
        }
      );
      await db.Province.bulkCreate(response.data.rajaongkir.results);
      return res.status(200).send(response.data.rajaongkir.results);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },

  getProvince: async (req, res) => {
    try {
      const result = await db.Province.findAll();
      res.status(200).send({
        message: "OK",
        result: result,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = provinceController;