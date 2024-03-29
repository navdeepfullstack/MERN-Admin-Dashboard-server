const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
require("dotenv").config();
const adminRoutes = require("./routes/adminAuthRoutes");
const userRoutes = require("./routes/usersRoutes");
const categoryRoutes = require("./routes/categoriesRoutes");
const vendorsRoutes = require("./routes/vendorRoutes");
const productRoutes = require("./routes/productRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const restaurantRoutes = require("./routes/restroRoutes");
const dishesRoutes = require("./routes/dishesRoutes");






const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Referer, User-Agent, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use(morgan("tiny"));
const fileUpload = require('express-fileupload');
app.use(fileUpload({
  // useTempFiles: true,
  // tempFileDir: '/tmp/'
}));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use(bodyParser.json({ limit: "50mb" }));

const db = process.env.MONGO_URI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected."))
  .catch((err) => console.log(err));




app.use("/admin", adminRoutes);
app.use("/admin/users", userRoutes);
app.use("/admin/category", categoryRoutes);
app.use("/admin/vendor", vendorsRoutes);
app.use("/admin/banner", bannerRoutes);
app.use("/admin/product", productRoutes);
app.use("/admin/restaurant", restaurantRoutes);
app.use("/admin/dish", dishesRoutes);










app.use(express.static("public"));

process.on("unhandledRejection", function (err) {
  console.error(err);
  console.log("Node NOT Exiting  11...");
  // process.exit()
});
process.on("uncaughtException", function (err) {
  console.error(err);
  console.log("Node NOT Exiting  22...");
  // process.exit()
});

const port = process.env.APP_PORT || 3020;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
