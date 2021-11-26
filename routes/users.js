const router = require("express").Router();

//Models
const User = require('../models/User.model')

//GET profile page
router.get('/profile', (req, res)=>{
  res.render("profile")
})


module.exports = router;