const express = require("express");
const router = express.Router();
const Profiles = require("../../models/Profile");
const auth = require("../../middleware/auth");

router.post("/create", auth, async (req, res) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({
      msg: "No Token is present",
    });
  }

  try {
    const { name } = req.body;

    let profile = new Profiles({
      user: req.user.id,
      name,
    });

    await profile.save();

    res.status(200).json({ msg: "Created Profile Successfully" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
