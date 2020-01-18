const express = require("express");
const router = express.Router();
const middleware = require("../../midlleware/midlleware");
const userModel = require("../../models/users");

// @route   GET api/auth
// @desc    Test route
// @access  Private
router.get("/", [middleware.auth], async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (user) {
      res.json(user);
    } else {
      res.status(500).send("Server Error");
    }
  } catch (error) {
    res.status(500).send("server error");
  }
});

module.exports = router;
