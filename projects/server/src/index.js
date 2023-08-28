const { join } = require("path");
require("dotenv").config({ path: join(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const db = require("./models");
const verify = require("./middleware/verify");
const cronJob = require("./utils/cronJob");

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
// const { verify } = require("crypto");
db.sequelize.sync({ alter: true });

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
app.use("/categoryImg", express.static(`${__dirname}/public/categoryImg`));
app.use("/productImg", express.static(`${__dirname}/public/productImg`));
app.use("/paymentImg", express.static(`${__dirname}/public/paymentImg`));
app.use("/avatar", express.static(`${__dirname}/public/Avatar`));
app.use(verify);
app.use("/api/user", routes.userRoutes);
app.use("/api/branch", routes.branchRoutes);
app.use("/api/token", routes.tokenRoutes);
app.use("/api/address", routes.addressRoutesB);
app.use("/api/category", routes.categoryRoutesB);
app.use("/api/stock", routes.stockRoutesB);
app.use("/api/addressG", routes.addressRoutesG);
app.use("/api/city", routes.cityRoutes);
app.use("/api/province", routes.provinceRoutes);
app.use("/api/cart", routes.cartRoutes);
app.use("/api/order-detail", routes.orderDetailRoutes);
app.use("/api/order", routes.orderRoutes);
app.use("/api/discount", routes.discountRoutes);
app.use("/api/product", routes.productRoutesB);
app.use("/api/voucher", routes.voucherRoutes);
app.use("/api/sales-report", routes.salesReportRoutes);

// import konfigurasi cron job
cronJob();

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
