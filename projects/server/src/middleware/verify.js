const key = process.env.secret_key;
const verify = async (req, res, next) => {
  const secret = req.headers["x-secret-key"];
  if (secret != key) {
    return res.status(500).send("Invalid key..!");
  }
  next();
};

module.exports = verify;
