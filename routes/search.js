const router = require("express").Router();
const chalk = require("chalk");
const axios = require("axios");

const Pic = require("../models/Pic.model");


/* GET 6 continents page */
router.get("/africa", async (req, res, next) => {
  try{
    const axiosCall = await axios("https://api.unsplash.com/search/photos?query=africa&limit=50&per_page=50&client_id=LwARo21TFMLDkRjpSxHDnwqKV9Hzz-07azjP4Fco4yU")
    const results = axiosCall.data.results

    // console.log(results)
    res.render("continents/africa.hbs", { results });
  }
  catch(err){
    console.log(chalk.bgRed(err))
  }

});


module.exports = router;