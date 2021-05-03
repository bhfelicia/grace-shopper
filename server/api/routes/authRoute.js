const router = require("express").Router();
const User = require("../../db/models/User");

router.post("/", async (req, res, next) => {
  try {
    const token = await User.authenticate(req.body);
    res.send({ token });
  } catch (ex) {
    next(ex);
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.send(await User.byToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

router.get("/oauth", async (req, res, next) => {
  try {
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${process.env.client_id}`
    );
  } catch (ex) {
    next(ex);
  }
});

module.exports = router;
