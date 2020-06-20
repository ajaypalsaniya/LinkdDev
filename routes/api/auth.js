const express = require("express");
const router = express.Router();

// @route  Post api/auth
// @desc   Register user
// @access Public

router.get("/", (req, res) => {
  res.send("auth route");
});

module.exports = router;
