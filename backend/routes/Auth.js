const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const Users = require("../models/Users");
const jwt = require('jsonwebtoken');
const fetchuser=require("../middleware/fetchuser")
const { body, validationResult } = require("express-validator");
router.post(
  "/createUser",
[  body("email", "the email you entered is incorrect").isEmail(),
  body("password", "Please enter password of length atleast 5").isLength({
    min: 5,
  })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      return res
        .status(400)
        .json({ error: "Sorry a user with this email already exists" });
    } else {
      // encryption
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      // encryption
      user = await Users.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });
      res.json(user);
    }
  }
);
router.post(
  "/login",
  body("email", "the email you entered is incorrect").isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user =await Users.findOne({ email: email });
      if (!user) {
        return res
          .status(400)
          .json({ error: "Please!! try to login with correct credentails" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res
          .status(400)
          .json({ error: "Please!! try to login with correct credentails" });
      }
      const payLoad={
        user:{
          id:user.id
        }
      }
      const authtoken=jwt.sign(payLoad,"deepak");
      res.json({"authtoken":authtoken})
    } catch (error) {
      res.status(500).send({error:"some internal error occured"})
    }
  }
);

router.post("/getuser",fetchuser,async(req,res)=>{
  try {
    let userId=req.user.id;
    const user=await Users.findById(userId).select("-password")
    res.json(user);

  } catch (error) {
    res.status(500).send({error:"Internal server Error occured"})
  }
})

module.exports = router;
