const db = require("../models");
const { Op } = require("sequelize");
const moment = require("moment");

const checkRole = (allowedRoles) => async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token, "INI TOKEN");
    const findToken = await db.Token.findOne({
      where: {
        [Op.and]: [
          { token },
          {
            expired: {
              [Op.gt]: moment().format(),
              [Op.lte]: moment().add(1, "d").format(),
            },
          },
          { valid: true },
        ],
      },
    });
    console.log(findToken);
    if (!findToken) {
      throw new Error("token expired");
    }
    const user = await db.User.findOne({
      where: {
        id: JSON.parse(findToken?.dataValues?.payload).id,
      },
    });

    if (!allowedRoles.includes(user.role)) {
      return res.status(401).send({
        message: `Anda Tercyduck Bukan ${allowedRoles.join(" atau ")}`,
      });
    }

    delete user.dataValues.password;
    req.user = user.dataValues;
    console.log(req.user.id);
    next();
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

module.exports = {
  checkUser: checkRole(["USER"]),
  checkAdmin: checkRole(["ADMIN"]),
  checkSuper: checkRole(["SUPER ADMIN"]),
  checkAllAdmin: checkRole(["SUPER ADMIN", "ADMIN"]),
};
