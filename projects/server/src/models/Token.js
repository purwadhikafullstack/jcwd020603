module.exports = (sequelize, Sequelize) => {
  const Token = sequelize.define(
    "Tokens", //nama table
    {
      token: {
        type: Sequelize.STRING,
      },
      expired: {
        type: Sequelize.DATE,
      },
      payload: {
        type: Sequelize.STRING,
      },
      valid: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      status: {
        type: Sequelize.ENUM("LOGIN", "FORGOT-PASSWORD", "VERIFY"),
      },
    }, // nama nama kolom
    {
      paranoid: true,
    } // options
  );

  return Token;
};
