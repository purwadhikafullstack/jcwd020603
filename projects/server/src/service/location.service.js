const db = require("../models");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const openCage_API_KEY = process.env.openCage_API_KEY;
module.exports = {
  openCage: async (input) => {
    try {
      const { address, district, city, province, latitude, longitude } = input;
      console.log(input);
      console.log(address, district, city, province, latitude, longitude);
      return await axios.get("https://api.opencagedata.com/geocode/v1/json", {
        params: {
          q:
            !latitude && !longitude
              ? `${address},${district},${city},${province}`
              : `${latitude}, ${longitude}`,
          countrycode: "id",
          limit: 1,
          key: openCage_API_KEY,
        },
      });
    } catch (err) {
      console.log(err.message);
    }
  },
};
