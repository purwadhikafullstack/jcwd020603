module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("Users", {
    user_name: Sequelize.STRING,
    role: {
      type: Sequelize.ENUM("SUPER ADMIN", "ADMIN", "USER"),
      defaultValue: "USER",
    },
    email: Sequelize.STRING,
    avatar: Sequelize.BLOB("long"),
    avatar_url: Sequelize.TEXT,
    gender: Sequelize.ENUM("MALE", "FEMALE"),
    birth_date: Sequelize.DATE,
    phone_number: Sequelize.STRING,
    password: Sequelize.STRING,
    verification: { type: Sequelize.BOOLEAN, defaultValue: false },
  },
  {
    paranoid : true
  });
  return User;
};
