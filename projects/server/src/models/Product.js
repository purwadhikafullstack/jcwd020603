module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "Products",
    {
      product_name: Sequelize.STRING,
      price: Sequelize.INTEGER,
      photo_product_url: Sequelize.STRING,
      photo_product_blob: Sequelize.BLOB("long"),
      desc: Sequelize.STRING,
      weight: Sequelize.INTEGER,
    },
    {
      paranoid: true,
    }
  );

  return Product;
};
