const express = require("express");
const router = express.Router();
const shopModel = require("../../models/shops");
const userModel = require("../../models/users");

// @route   GET /api/shops/getShops
// @desc    Get All the shops
// @access  Private
router.get("/getShops", [middleware.auth], async (req, res) => {
  try {
    const result = await shopModel.getShops(req.user.id);
    const position = await userModel.getPosition(req.user.id);
    function distance(lat1, lon1, lat2, lon2) {
      var p = 0.017453292519943295; // Math.PI / 180
      var c = Math.cos;
      var a =
        0.5 -
        c((lat2 - lat1) * p) / 2 +
        (c(lat1 * p) * c(lat2 * p) * (1 - c((lon2 - lon1) * p))) / 2;
      return 12742 * Math.asin(Math.sqrt(a)); // 2 * R; R = 6371 km
    }
    result.map(value => {
      const destination = parseFloat(
        distance(
          position.user_latitude,
          position.user_longitude,
          value.shop_latitude,
          value.shop_longitude
        ).toFixed(2)
      );
      value.destination = destination;
    });
    result.sort((a, b) => {
      if (a.destination > b.destination) return 1;
      if (a.destination < b.destination) return -1;
      return 0;
    });
    res.json(result);
  } catch (error) {
    res.status(500).send("server error");
  }
});

// @route   POST /api/shops/likeShop
// @desc    Like a shop
// @access  Private
router.post("/likeShop", [middleware.auth], async (req, res) => {
  try {
    const LikedShopsData = await shopModel.likedShops(req.user.id);
    let message = "Like Shop Done";
    LikedShopsData.forEach(val => {
      if (val.id_shop === req.body.id && val.id_user === req.user.id) {
        message = "shop already Liked";
      }
    });
    if (message !== "shop already Liked") {
      const result = await shopModel.likeShop(req.user.id, req.body.id);
    }

    res.json({ success: true, msg: message });
  } catch (error) {
    res.status(500).send("server error");
  }
});

// @route   POST /api/shops/likeShop
// @desc    Dislike a shop
// @access  Private
router.post("/dislikeShop", [middleware.auth], async (req, res) => {
  try {
    const result = await shopModel.dislikeShop(req.user.id, req.body.id);
    res.json({ success: true, msg: "Dislike Shop Done" });
  } catch (error) {
    res.status(500).send("server error");
  }
});

module.exports = router;
