const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const { init } = require("./db/index");
init();

const port = process.env.PORT || 9000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.join(__dirname, "..", "public")));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use("/api/products/", require("./api/routes/productRoute"));
app.use("/api/users/", require("./api/routes/userRoute"));
app.use("/api/orders/", require("./api/routes/orderRoute"));
app.use("/api/reviews/", require("./api/routes/reviewRoute"));
app.use("/api/categories", require("./api/routes/categoryRoute"));

//500 handler
app.use((error, req, res, next) => {
  res.status(500).send(error);
});

app.listen(port, () => console.log(`listening on port: ${port}`));
