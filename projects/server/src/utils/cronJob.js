const cron = require("node-cron");
const orderController = require("../controllers").orderController;

const cronJob = () => {
  cron.schedule("*/1 * * * *", () => {
    try {
      orderController.cancelOrderAutomatically();
      orderController.doneOrderAutomatically();
      console.log("cron job running");
    } catch (err) {
      console.log("Error in cron job", err.message);
    }
  });
};

module.exports = cronJob;
