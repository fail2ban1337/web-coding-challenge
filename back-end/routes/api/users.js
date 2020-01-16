const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const userModel = require("../../models/users");
const jwt = require("jsonwebtoken");
const config = require("config");
const key = config.get("jwtSecret");

// @route   POST api/users/login
// @desc    Login User
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    const user = await userModel.findOne(email);
    if (user) {
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        console.log("1");
        return res.status(400).json({
          errors: [
            {
              msg: "Wrong Credentials"
            }
          ]
        });
      }
      const payload = {
        id: user.id
      };

      jwt.sign(
        payload,
        key,
        {
          expiresIn: 3600
        },
        (err, token) => {
          if (err) throw err;
          return res.json({
            token
          });
        }
      );
    } else {
      return res.status(400).json({
        errors: [
          {
            msg: "Wrong Credentials"
          }
        ]
      });
    }
  } catch (err) {
    res.status(500).send({
      errors: [
        {
          msg: "Server error"
        }
      ]
    });
  }
});

// @route   GET api/users
// @desc     Register User
// @access  Public
router.post(
  "/register",
  [
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Please entre a password with 6 or more characters"
    ).isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const { email, password } = req.body;
    try {
      let user = await userModel.findOne(email);
      if (user) {
        return res.status(400).json({
          errors: [
            {
              msg: "Email already exists"
            }
          ]
        });
      } else {
        let hash = bcrypt.hashSync(password, 10);
        let result = await userModel.register(email, hash);
        if (result) {
          return res.status(200).json({
            msg: "user registered successfully"
          });
        } else {
          return res.status(503).json({
            errors: [
              {
                msg: "error occured on the database"
              }
            ]
          });
        }
      }
    } catch (err) {
      console.log(err.message);
      res.status(500).send({
        errors: [
          {
            msg: "Server error"
          }
        ]
      });
    }
  }
);

module.exports = router;
