const router = require("express").Router();
const chalk = require("chalk");
const axios = require("axios");

const User = require("../models/User.model");


/* GET 6 continents page */
router.get("/", (req, res, next) => {
  res.render("search.hbs");
});



//My own middleware
// const {isLoggedIn} = require("../middleware/route-gard")

// router.get("/", isLoggedIn, async (req, res) => {
//   try {
//     const axiosCall = await axios(
//       `https://api.unsplash.com/search/photos?query=africa&client_id={process.env.API_KEY}`;
//       const africaButton = document.querySelector('.getAfricaButton');  //&hash=${process.env.HASH}`
//       const africaImgDisplay = document.querySelector('.africaImgDisplay');

//       africaButton.addEventListener('click', async() =>{
//         let africaImage = await getNewAfricaImg();
//         africaImgDisplay.src = africaImage;
//       });
//     );
//     const charactersInfo = axiosCall.data.data.results; //esto es un array
//     res.render("./characters.hbs", { charactersInfo });
//   } catch (err) {
//     console.log(chalk.bgRed(err));
//   }
// });

//------------------------------------- codi london query ----------
const requestUrl =
'https://api.unsplash.com/search/photos?query=london&client_id={process.env.API_KEY}';
const getAfricaButton = document.querySelector('.getAfricaButton');
const africaImgDisplay = document.querySelector('.africaImgDisplay');

getAfricaButton.addEventListener('click', async () => {
let africaImg = await getAfricaImg();
africaImgDisplay.src = africaImg;
});

async function getAfricaImg() {
let randomNumber = Math.floor(Math.random() * 10);
return fetch(requestUrl)
  .then((response) => response.json())
  .then((data) => {
    let allAfricaImg = data.results[randomNumber];
    return allAfricaImg.urls.regular;
  });
}
//------------------------------------- codi london query ----------




module.exports = router;