const router = require("express").Router();
const chalk = require("chalk");
const axios = require("axios");
// const Character = require("../models/Character.model");
// const User = require("../models/User.model");
const {isLoggedIn} = require("../middleware/route-gard");
const Pic = require("../models/Pic.model");
const User = require("../models/User.model");


/* GET favorites page */
router.get("/", isLoggedIn, (req, res, next) => {
  res.render("./favorites.hbs");
});



//---------- CREATE FAVORITE PICS BY id ----------------------------------------------------------------------------------------------------------------
router.post("/create/:id", async (req, res) => {

  const axiosCall = await axios(`https://api.unsplash.com/photos/${req.params.id}?client_id=${process.env.API_KEY}&hash=${process.env.HASH}`)
    // console.log(axiosCall.data)
  const infoFromPic = axiosCall.data
    // console.log("hola")
    // console.log(infoFromPic)
  const dataToUpload = {
    image: infoFromPic.urls.regular,
    photographer: infoFromPic.user.name,
    country: infoFromPic.location.country,
    portfolio: infoFromPic.user.links.html,
    downloads: infoFromPic.downloads
  }

  // console.log(dataToUpload)

    const picToFavs = await Pic.create(dataToUpload)
    console.log(picToFavs._id)

    await User.findByIdAndUpdate(req.session.loggedUser._id,
      {$push: {pics: picToFavs._id}},
      {new: true}
    );

    res.redirect('/favorites')
});


module.exports = router;