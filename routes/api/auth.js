const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// @route  Post api/auth
// @desc   Register user
// @access Public

router.get("/", auth, (req, res) => {
  res.send("Auth route");
});

module.exports = router;
