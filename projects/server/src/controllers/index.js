const userController = require("./users");
const addressControllerB = require("./addressB");
const categoryControllerB = require("./categoryB");
const productControllerB = require("./productB");
const stockControllerB = require("./stockB");
const addressControllerG = require("./addressG");
const provinceController = require("./province");
const cityController = require("./city");
const cartController = require("./cart");
const orderDetailController = require("./orderDetail");
const orderController = require("./orders");
const voucherController = require("./voucher");
const branchController = require("./branch");
const tokenController = require("./token");
const discountController = require("./discount");

module.exports = {
  userController,
  addressControllerB,
  categoryControllerB,
  productControllerB,
  stockControllerB,
  addressControllerG,
  provinceController,
  cityController,
  cartController,
  orderDetailController,
  orderController,
  voucherController,
  branchController,
  tokenController,
  discountController,
};
