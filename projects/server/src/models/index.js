"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Address = require("./Address")(sequelize, Sequelize);
db.Province = require("./Province")(sequelize, Sequelize);
db.City = require("./City")(sequelize, Sequelize);
db.Branch = require("./Branch")(sequelize, Sequelize);
db.Product = require("./Product")(sequelize, Sequelize);
db.Category = require("./Category")(sequelize, Sequelize);
db.Order = require("./Order")(sequelize, Sequelize);
db.OrderDetail = require("./OrderDetail")(sequelize, Sequelize);
db.Discount = require("./Discount")(sequelize, Sequelize);
db.Voucher = require("./Voucher")(sequelize, Sequelize);
db.ShippingMethod = require("./ShippingMethod")(sequelize, Sequelize);
db.Stock = require("./Stock")(sequelize, Sequelize);
db.StockHistory = require("./StockHistory")(sequelize, Sequelize);
db.User = require("./User")(sequelize, Sequelize);
db.Token = require("./Token")(sequelize, Sequelize);
db.Cart = require("./Cart")(sequelize, Sequelize);

db.Address.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "User",
});

db.Product.belongsTo(db.Category, {
  foreignKey: "category_id",
  as: "Category",
});

db.Stock.belongsTo(db.Branch, {
  foreignKey: "branch_id",
  as: "Branch",
});

db.Stock.belongsTo(db.Product, {
  foreignKey: "product_id",
  as: "Product",
});

db.Order.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "User",
});

db.OrderDetail.belongsTo(db.Order, {
  foreignKey: "order_id",
  as: "Order",
});

db.OrderDetail.belongsTo(db.Stock, {
  foreignKey: "stock_id",
  as: "Stock",
});

db.ShippingMethod.belongsTo(db.Order, {
  foreignKey: "order_id",
  as: "Order",
});

db.StockHistory.belongsTo(db.Stock, {
  foreignKey: "stock_id",
  as: "Stock",
});

db.User.belongsTo(db.Branch, {
  foreignKey : "branch_id",
  as : "Branch"
})

db.City.belongsTo(db.Province, {
  foreignKey: "province_id",
  as: "Province",
});

db.Stock.belongsTo(db.Discount, {
  foreignKey: "discount_id",
  as: "Discount",
});

db.Cart.belongsTo(db.Stock, {
  foreignKey: "stock_id",
  as: "Stock",
});

db.Cart.belongsTo(db.User, {
  foreignKey: "user_id",
  as: "User",
});

db.Address.belongsTo(db.City, {
  foreignKey: "city_id",
  as: "City",
  target: "city_id",
});

db.Branch.belongsTo(db.City, {
  foreignKey: "city_id",
  as: "City",
  target: "city_id",
});

module.exports = db;
