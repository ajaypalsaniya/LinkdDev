const express = require("express");
const router = express.Router();

// @route  Post api/profile
// @desc   Register user
// @access Public

router.post("/", (req, res) => {
  res.send("Profile route");
});

module.exports = router;
