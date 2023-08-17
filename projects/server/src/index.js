require("dotenv/config");
const express = require("express");
const cors = require("cors");
const db = require("./models");
const { join } = require("path");
const verify = require("./middleware/verify");

const PORT = process.env.PORT || 8000;
const app = express();
// app.use(
// cors({
// origin: [
// process.env.WHITELISTED_DOMAIN &&
// process.env.WHITELISTED_DOMAIN.split(","),
// ],
// })
// );
const routes = require("./routes");
const { route } = require("./routes/branch");
app.use(cors());
app.use(express.json());
// app.use(verify);
// const { verify } = require("crypto");
// db.sequelize.sync({ alter: true });

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
app.use("/categoryImg", express.static(`${__dirname}/public/categoryImg`));
app.use("/productImg", express.static(`${__dirname}/public/productImg`));
app.use("/paymentImg", express.static(`${__dirname}/public/paymentImg`));
app.use("/user", routes.userRoutes);
app.use("/branch", routes.branchRoutes);
app.use("/token", routes.tokenRoutes);
app.use("/address", routes.addressRoutesB);
app.use("/category", routes.categoryRoutesB);
app.use("/stock", routes.stockRoutesB);
app.use("/addressG", routes.addressRoutesG);
app.use("/city", routes.cityRoutes);
app.use("/province", routes.provinceRoutes);
app.use("/cart", routes.cartRoutes);
app.use("/order-detail", routes.orderDetailRoutes);
app.use("/order", routes.orderRoutes);
app.use("/discount", routes.discountRoutes);
app.use("/product", routes.productRoutesB);
app.use("/voucher", routes.voucherRoutes);
app.use("/sales-report", routes.salesReportRoutes);
app.use("/avatar", express.static(`${__dirname}/public/Avatar`));

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
