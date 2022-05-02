const express = require("express");
require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const app = express();
const connectDb = require("./connection/connection");
const dotenv = require("dotenv");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/UsersRoutes");
const orderRoutes = require("./routes/orderRoute");
app.use(express.json());

// dotenv
dotenv.config();

connectDb();

app.get("/", (req, res) => {
  res.send("Welcome to Node Server");
});

//
app.use("/api", productRoute);
app.use("/api/users", userRoute);
app.use("/api/order", orderRoutes);
app.use(errorHandler);

const PORT = 5000;
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `server is running in ${process.env.NODE_ENV} Mode at PORT ${process.env.PORT}`
      .inverse.white
  );
});
