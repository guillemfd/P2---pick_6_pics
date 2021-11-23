const router = require("express").Router();
const chalk = require("chalk");
const axios = require("axios");

const Pic = require("../models/Pic.model");


/* GET 6 continents page */
router.get("/", async (req, res, next) => {
  try{
    const axiosCall = await axios("https://api.unsplash.com/search/photos?query=london&client_id=LwARo21TFMLDkRjpSxHDnwqKV9Hzz-07azjP4Fco4yU")
    console.log(axiosCall)
    res.render("search.hbs");
  }
  catch(err){
    console.log(chalk.bgRed(err))
  }

});

//---------------------- código enlazado al search.hbs ---------------------
// const requestUrl =
// 'https://api.unsplash.com/search/photos?query=london&client_id=LwARo21TFMLDkRjpSxHDnwqKV9Hzz-07azjP4Fco4yU';
// const getImagesButton = document.querySelector('.getImagesButton');
// const imageToDisplay = document.querySelector('.imageToDisplay');

// getImagesButton.addEventListener('click', async () => {
// let randomImage = await getNewImage();
// imageToDisplay.src = randomImage;
// });

// async function getNewImage() {
// let randomNumber = Math.floor(Math.random() * 10);
// return fetch(requestUrl)
//   .then((response) => response.json())
//   .then((data) => {
//     let allImages = data.results[randomNumber];
//     return allImages.urls.regular;
//   });
// }




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

//------------------------------------- codi AFRICA query ----------
// const requestUrl =
// 'https://api.unsplash.com/search/photos?query=africa&client_id={process.env.API_KEY}';
// const getAfricaButton = document.querySelector('.getAfricaButton');
// const africaImgDisplay = document.querySelector('.africaImgDisplay');

// getAfricaButton.addEventListener('click', async () => {
// let africaImg = await getAfricaImg();
// africaImgDisplay.src = africaImg;
// });

// async function getAfricaImg() {
// let randomNumber = Math.floor(Math.random() * 10);
// return fetch(requestUrl)
//   .then((response) => response.json())
//   .then((data) => {
//     let allAfricaImg = data.results[randomNumber];
//     return allAfricaImg.urls.regular;
//   });
// }
//------------------------------------- codi london query ----------




module.exports = router;