const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    res.status(401).json({ msg: "No token, authorization is denied" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtToken"));
    req.user = decoded.user;
    console.log("At middleware/auth.js " + req.user.id);

    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
