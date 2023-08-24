const { db_username, db_password, db_database, db_host, db_dialect } =
  process.env;
const PORT = process.env.PORT;

module.exports = {
  development: {
    username: db_username, //"root",
    password: db_password, //"password",
    database: db_database, //"db_sahabat_sembako",
    host: db_host, // "localhost",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: db_username, //"root",
    password: db_password, //"password",
    database: db_database, //"db_sahabat_sembako",
    host: db_host, // "localhost",
    dialect: "mysql",
    logging: false,
  },
};
