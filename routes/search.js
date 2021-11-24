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


router.get("/africa", isLoggedIn, async (req, res, next) => {
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



//----------------------------- create FAVORITE ---------- create FAVORITE ---------- create FAVORITE ---------- create FAVORITE --
// const favButton = document.getElementById('favButton')

// function addFav(){
//   if(!audio.paused){
//     favButton.style.backgroundImage = 'url(../sounds/sound_off.png)';
//   } else {
//     favButton.style.backgroundImage = 'url(../sounds/sound_on.png)';
//   }
// }


// router.post("/create/:id", async (req, res) => {
//   const axiosCall = await axios(
//     `http://gateway.marvel.com/v1/public/characters/${req.params.id}?ts=1&apikey=${process.env.API_KEY}&hash=${process.env.HASH}`
//   );

//   const infoFromCharacter = axiosCall.data.data.results;

//   const dataToUpload = {
//     name: infoFromCharacter[0].name,
//     description: infoFromCharacter[0].description,
//     thumbnail:
//       infoFromCharacter[0].thumbnail.path +
//       "." +
//       infoFromCharacter[0].thumbnail.extension,
//     comic: [...infoFromCharacter[0].comics.items],
//   };

//   const justCreatedCharacter = await Character.create(dataToUpload);

//   await User.findByIdAndUpdate(
//     req.session.loggedUser._id,
//     { $push: { characters: justCreatedCharacter._id } },
//     { new: true }
//   );

//   res.redirect('/')
// });