const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const myToken = "AdnaN";

//Route :1  create a user using using post : "./api/auth/register" : No Login Required

router.post(
  "/register",
  [
    // username must be at least 3 chars long
    body("name", "Name Must be Atleast 3 Chars Long").isLength({ min: 3 }),
    // username must be an email
    body("email", "Pleasse Enter a Valid Email Address").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password Must be Atleast 3 Chars Long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    // if there are errors then return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // if email already exist then return error
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json(
            "Sorry a user with this email already Exist. Please Try diffrent one ."
          );
      }
      const salt = await bcrypt.genSalt(5);
      const secpass = await bcrypt.hash(req.body.password, salt);
      // create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secpass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, myToken);
      //   console.log(jwtData)
      res.json({ authtoken });
      //   res.send(user);
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Internal Server Error");
    }
  }
);

// Route :2  Authenticate a user using post : "./api/auth/login" :no Login Required

router.post(
  "/login",
  [
    // email must be an valid email
    body("email", "Pleasse Enter a Valid Email Address").isEmail(),
    // password must be at least 5 chars long
    body("password", "Password cannot be empty").exists(),
  ],
  async (req, res) => {
    // if there are errors then return bad request and errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      // if email already exist then return error
      let user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res
          .status(404)
          .json({ errors: "Please login with correct credential " });
      }

      let passComp = await bcrypt.compare(password, user.password);
      if (!passComp) {
        return res
          .status(404)
          .json({ errors: "Please login with correct credential " });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const authtoken = jwt.sign(data, myToken);
      //   console.log(jwtData)
      res.json({ authtoken });
      // return res.status(200).send({user:"User successfully logged in"});
    } catch (error) {
      console.log(error.message);
      res.status(500).json("Internal Server Error");
    }
  }
);

//Route :3  Get  userDetail using post : "./api/auth/getdetail" : Login Required
router.post("/getdetail",fetchuser, async (req, res) => {
  
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user)
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal Server Error");
  }
});

module.exports = router;
