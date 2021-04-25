const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const { init } = require("./db/index");
init();

const port = 9000 || process.env.PORT;

app.use(morgan("dev"));

app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "..", "public")));
app.listen(port, () => console.log(`listening on port: ${port}`));

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
