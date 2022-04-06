const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const errorMiddleware = require("./middleware/error")
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv"); 
const path = require("path");


//config
if (process.env.NODE_ENV !== "PRODUCTION") {
    require("dotenv").config({ path: "backend/config/config.env" });
  }
// dotenv.config({path: "backend/config/config.env"});



app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileupload());

const order = require("./routes/orderRoutes");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const payment = require("./routes/paymentRoute");


//route import
app.use("/api/v1", product,user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
// app.use("api/v1");

//middleware for error
app.use(errorMiddleware);

module.exports = app