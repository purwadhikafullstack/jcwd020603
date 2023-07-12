module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    "Products",
    {
      product_name: Sequelize.STRING,
      price: Sequelize.INTEGER,
      photo_product_url: Sequelize.STRING,
      photo_product_blob: Sequelize.BLOB("long"),
      isDiscount: { type: Sequelize.BOOLEAN, defaultValue: false },
      desc: Sequelize.STRING,
    },
    {
      paranoid: true,
    }
  );

  return Product;
};
