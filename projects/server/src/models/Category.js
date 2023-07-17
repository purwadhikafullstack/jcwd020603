module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("Categories", {
    category_name: Sequelize.STRING,
    photo_category_url: Sequelize.STRING,
  });
  return Category;
};
