const router = require("express").Router();
const chalk = require("chalk");
const axios = require("axios");

const Pic = require("../models/Pic.model");
const User = require("../models/User.model");


/* GET search page */
router.get("/", (req, res, next) => {
  res.render("./search.hbs");
});


/* GET 6 continents page */
const {isLoggedIn} = require("../middleware/route-gard")

// ----------AFRICA----------------------AFRICA----------------------AFRICA----------------------AFRICA----------------------AFRICA------------
router.get("/africa", isLoggedIn, async (req, res, next) => {
  try{
    const axiosCall = await axios(`https://api.unsplash.com/search/photos?query=africa&limit=50&per_page=50&client_id=${process.env.API_KEY}&hash=${process.env.HASH}`)
    const results = axiosCall.data.results

    // console.log(results)
    res.render("continents/africa.hbs", { results });
  }
  catch(err){
    console.log(chalk.bgRed(err))
  }

});


//----------AMERICA----------------------AMERICA----------------------AMERICA----------------------AMERICA----------------------AMERICA--------------
router.get("/america", isLoggedIn, async (req, res, next) => {
  try{
    const axiosCall = await axios(`https://api.unsplash.com/search/photos?query=america-landscape&limit=50&per_page=50&client_id=${process.env.API_KEY}&hash=${process.env.HASH}`)
    const results = axiosCall.data.results

    // console.log(results)
    res.render("continents/america.hbs", { results });
  }
  catch(err){
    console.log(chalk.bgRed(err))
  }

});



//----------ANTARTICA----------------------ANTARTICA----------------------ANTARTICA----------------------ANTARTICA----------------------ANTARTICA----------
router.get("/antartica", isLoggedIn, async (req, res, next) => {
  try{
    const axiosCall = await axios(`https://api.unsplash.com/search/photos?query=antartica&limit=50&per_page=50&client_id=${process.env.API_KEY}&hash=${process.env.HASH}`)
    const results = axiosCall.data.results

    // console.log(results)
    res.render("continents/antartica.hbs", { results });
  }
  catch(err){
    console.log(chalk.bgRed(err))
  }

});


//----------ASIA----------------------ASIA----------------------ASIA----------------------ASIA----------------------ASIA----------
router.get("/asia", isLoggedIn, async (req, res, next) => {
  try{
    const axiosCall = await axios(`https://api.unsplash.com/search/photos?query=asia&limit=50&per_page=50&client_id=${process.env.API_KEY}&hash=${process.env.HASH}`)
    const results = axiosCall.data.results

    // console.log(results)
    res.render("continents/asia.hbs", { results });
  }
  catch(err){
    console.log(chalk.bgRed(err))
  }

});


//----------EUROPE----------------------EUROPE----------------------EUROPE----------------------EUROPE----------------------EUROPE----------
router.get("/europe", isLoggedIn, async (req, res, next) => {
  try{
    const axiosCall = await axios(`https://api.unsplash.com/search/photos?query=europe&limit=50&per_page=50&client_id=${process.env.API_KEY}&hash=${process.env.HASH}`)
    const results = axiosCall.data.results

    // console.log(results)
    res.render("continents/europe.hbs", { results });
  }
  catch(err){
    console.log(chalk.bgRed(err))
  }

});


//----------OCEANIA----------------------OCEANIA----------------------OCEANIA----------------------OCEANIA----------------------OCEANIA----------
router.get("/oceania", isLoggedIn, async (req, res, next) => {
  try{
    const axiosCall = await axios(`https://api.unsplash.com/search/photos?query=oceania&limit=50&per_page=50&client_id=${process.env.API_KEY}&hash=${process.env.HASH}`)
    const results = axiosCall.data.results

    // console.log(results)
    res.render("continents/oceania.hbs", { results });
  }
  catch(err){
    console.log(chalk.bgRed(err))
  }

});


module.exports = router;