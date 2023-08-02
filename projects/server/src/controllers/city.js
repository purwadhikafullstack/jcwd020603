const { default: axios } = require("axios");
const db = require("../models");

const cityController = {
  addCityData: async (req, res) => {
    try {
      const response = await axios.get(
        "https://api.rajaongkir.com/starter/city",
        {
          headers: { key: process.env.RajaOngkir_API_KEY },
        }
      );
      await db.City.bulkCreate(response.data.rajaongkir.results);
      return res.status(200).send(response.data.rajaongkir.results);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  },
  getCity: async (req, res) => {
    try {
      const result = await db.City.findAll({
        where: {
          province_id: req.params.id,
        },
      });
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

module.exports = cityController;