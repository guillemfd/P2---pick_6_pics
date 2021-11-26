const router = require("express").Router();
const axios = require("axios");
const {isLoggedIn} = require("../middleware/route-gard");
const Pic = require("../models/Pic.model");
const User = require("../models/User.model");


/* GET favorites page */
router.get("/", isLoggedIn, async (req, res, next) => {

  const currUser = await User.findById(req.session.loggedUser._id).populate('pics')

  res.render("./favorites.hbs", {pics: currUser.pics} );
});


//---------- CREATE FAVORITE PICS BY id ----------------------------------------------------------------------------------------------------------------
router.post("/create/:id", async (req, res) => { 

  //Para la versión V2; hacer llamada a base de datos y comprobar que en el array de pics del usuario no hay ninguna
  //pic con el continente recibido por params. (Para que no puedan haber más de una foto favorita por continente)

  const axiosCall = await axios(`https://api.unsplash.com/photos/${req.params.id}?client_id=${process.env.API_KEY}&hash=${process.env.HASH}`)
  const infoFromPic = axiosCall.data

  const dataToUpload = {
    image: infoFromPic.urls.regular,
    photographer: infoFromPic.user.name,
    country: infoFromPic.location.country,
    portfolio: infoFromPic.user.links.html,
    downloads: infoFromPic.downloads,
    fullimage: infoFromPic.urls.full

  }

    const picToFavs = await Pic.create(dataToUpload)

    await User.findByIdAndUpdate(req.session.loggedUser._id,
      {$push: {pics: picToFavs._id}},);

    res.redirect(`/favorites`)
});


//---------- DELETE FAVORITE PICS BY id ----------------------------------------------------------------------------------------------------------------
router.post("/delete/:id", async (req, res) => { 
  
    try{
        await Pic.findByIdAndDelete(req.params.id, {new: true})
        await User.findByIdAndUpdate(req.session.loggedUser._id, {$pull: {pics: req.params.id}},);
    }catch(err){
      console.log(err)
    }
    res.redirect(`/favorites`)
});

module.exports = router;