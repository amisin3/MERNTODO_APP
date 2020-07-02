const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Users = require("../../models/User");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

// @route api/auth
// @desc Test route
// @access public
router.get("/", auth, async (req, res) => {
  try {
    console.log("routes/api/auth.js " + req.user.id);
    const user = await Users.findById(req.user.id).select("-password");

    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
});

// @route api/auth
// @desc Auth user and get token
// @access public
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await Users.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      console.log(user.id);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid credentials" }] });
      }

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtToken"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
