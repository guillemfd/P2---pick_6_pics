const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const {isLoggedIn, isLoggedOut}  = require("../middleware/route-gard")



/* GET form to create new user */
router.get("/signup", (req, res) => {
  res.render("auth/signup")
})
// console.log('here')
router.get("/login", isLoggedOut, (req, res)=>{
  res.render("auth/login")
})



//POST para crear un nuevo usuario -------------------------------------------------------------
router.post("/signup", async (req, res, next) => {
  const { username, email, password, passwordRepeat } = req.body;

  //Verificar que no hay ningún campo vacío
  if (!username || !email || !password || !passwordRepeat) {
    res.render("auth/signup.hbs", { msg: "You need to fill all inputs" });
    return;
  }

  // Compara contraseñas
  if (password !== passwordRepeat) {
    res.render("auth/signup.hbs", { msg: "Passwords does not match" });
    return;
  }

  //Verificar que la contraseña tiene mínimo 8 letras
  if (password.length < 8) {
    res.render("auth/signup.hbs", {
      msg: "Your password should be at least 8 characters long",
    });
    return;
  }

  //Verificar que el usuario no existe ya
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    res.render("auth/signup", { msg: "This user already has an account" });
    return;
  }

  //Verificar el correcto formato del correo
  if (/\S+@\S+\.\S+/.test(email) === false) {
    res.render("auth/signup", { msg: "Please put a valid email" });
  }

  //Proceso para crear e usuario
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.redirect("/auth/login");
  } catch (err) {
    console.log(err);
  }
});
//----------------------------------------------------------------------------------------------


// POST log in--------------------------------------------------------------------

router.post('/login', async (req, res)=>{
  const {username, password} = req.body

  if(!username || !password){ //Si dejan algun campo vacio
    res.render("auth/login", {msg: "You need to fill all inputs"})
  }
  const userFromDB = await User.findOne({username})
  if(!userFromDB){ //Si el usuario no existe
    res.render("auth/login", {msg: "The user does not exist"})
  } else { //Si el usuario existe
    const passwordsMatch = await bcrypt.compare(password, userFromDB.password)
    if(!passwordsMatch){ //Si la contraseña introducida no es correcta
      res.render("auth/login", {msg: "Incorrect password"})
    } else {
      req.session.loggedUser = userFromDB
      // console.log('SESSION ======> ', req.session)
      res.redirect('/search')
    }
  }
})

//POST logout --------------------------------------------------------------------
router.get('/logout', (req, res, next) => {
  
  res.clearCookie('connect.sid', {path: '/',})

  try{
    req.session.destroy()
    res.redirect('/')
  }catch(err){
    next(err)
  }

})

module.exports = router;