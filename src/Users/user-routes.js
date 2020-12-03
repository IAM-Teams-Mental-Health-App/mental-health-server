const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createToken = require('../utils/createToken');
const {insert,findById,findByEmail,findByUsername} = require('./user-model');
const authRestrict = require('../utils/authRestrict')


const router = express.Router();

router.post('/', async (req,res)=>{
    const usedUsername = await findByUsername(req.body.username);
    if(usedUsername){
      return res.status(400).json({message: "username taken"});
    }
    const usedEmail = await findByEmail(req.body.email);
    if(usedEmail){
      return res.status(400).json({message: "email taken"});
    }

    const hashpass = await bcrypt.hashSync(req.body.password,12);

    const user = await insert({...req.body, password: hashpass});
    delete user.password;
    console.log("### added user!");
    const token = await createToken(user);

    return res.status(201).json({ user, token });
})

router.get("/:id", async (req,res)=>{
  const user = await findById(parseInt(req.params.id));
  // check if there was a user
  if (!user) {
    return res.status(404).json({
      message: "User not found.",
    });
  }
  // all good
  return res.status(200).json(user);
});

router.post("/login",async (req,res)=>{
  const user = await findByEmail(req.body.email);
  // console.log(user);
  if (!user) {
    return res.status(401).json({
      message: "No user with this email",
    });
  }
  console.log("User found, attempting to login");
  req.user = user;
  console.log("body: ",req.body);
  const vibeCheck = await bcrypt.compareSync(req.body.password,user.password);
  if (!vibeCheck) {
    return res.status(401).json({
      message: "Wrong email or password!",
    });
  }
  console.log("Password check passed, issuing token");
  delete req.user.password;
  const token = await createToken(req.user);
  // all good
  return res.status(200).json({ user: req.user, token });

});

router.post("/logout",authRestrict(), (req,res)=>{
  // console.log(req.headers);
  const token = jwt.sign(
    { userID: null, isLoggedIn: false },
    process.env.JWT_SECRET
  );

  return res.status(200).json({ message: "✌ See ya later", token });
});


module.exports = router;