const router = require("express").Router();

/* GET 6 continents page */
router.get("/", (req, res, next) => {
  res.render("search.hbs");
});

module.exports = router;