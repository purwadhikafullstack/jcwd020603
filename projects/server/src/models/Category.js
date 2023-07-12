module.exports = (sequelize, Sequelize) => {
  const Category = sequelize.define("Categories", {
    category_name: Sequelize.STRING,
  });
  return Category;
};
