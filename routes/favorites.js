const router = require("express").Router();
const chalk = require("chalk");
const axios = require("axios");
// const Character = require("../models/Character.model");
// const User = require("../models/User.model");
const {isLoggedIn} = require("../middleware/route-gard");
const Pic = require("../models/Pic.model");
const User = require("../models/User.model");


/* GET favorites page */
router.get("/", isLoggedIn, async (req, res, next) => {

  const currUser = await User.findById(req.session.loggedUser._id).populate('pics')

  res.render("./favorites.hbs", {pics: currUser.pics} );
});



//---------- CREATE FAVORITE PICS BY id ----------------------------------------------------------------------------------------------------------------
router.post("/create/:id", async (req, res) => {  //:continent como params 

  //llamada a base de datos y comprobar que en el array de pics del usuario no hay ninguna pic con el continente recibido por params

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

  const deletePicById = async (id)=>{
    try{
      const deletedPic = await Student.findByIdAndDelete(id, {new: true})
      console.log("helloooo")
    }catch(err){
      console.log(err)
    }

    res.redirect(`/favorites`)
  }
});

// router.post("/delete/:id", async (req, res) => { 
//   await User.findByIdAndUpdate(req.session.loggedUser._id,
//     {$pop: {pics}},);

//   res.redirect(`/favorites`)
// });


module.exports = router;