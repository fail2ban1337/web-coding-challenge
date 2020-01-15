const express = require("express");
const router = express.Router();

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", async (req, res) => {
    try {

    } catch (error) {
        console.log(error);
        res.status(500).send('server error');
    }
});

module.exports = router;