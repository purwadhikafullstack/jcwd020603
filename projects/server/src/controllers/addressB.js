const db = require("../models");
const Sequelize = require("sequelize");
const axios = require("axios");

const addressControllerB = {
  getLatLng: async (req, res) => {
    const { address, district, city, province } = req.body;
    const response = await axios.get(
      "https://api.opencagedata.com/geocode/v1/json",
      {
        params: {
          q: `${address}, ${district}, ${province}, ${city}`,
          countrycode: "id",
          limit: 1,
          key: "832e785b093e4410a08ef16367f7d78d",
        },
      }
    );
    console.log(response.data.results[0].geometry);
    res.send(response.data.results[0].geometry);
  },

  getAddress: async (req, res) => {
    const { latitude, longitude } = req.query;
    console.log(latitude);
    console.log(longitude);
    try {
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: `${latitude}, ${longitude}`,
            countrycode: "id",
            limit: 1,
            key: "832e785b093e4410a08ef16367f7d78d",
          },
        }
      );
      console.log(response?.data?.results[0].formatted);
      res.send(response?.data?.results[0].formatted);
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  },
};

module.exports = addressControllerB;
