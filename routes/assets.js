const express = require("express");
const assetsController = require("../controller/assets");
const isAuth = require("../middleware/is-auth");
const router = express.Router();

router.get("/getAssets", isAuth, assetsController.getAssets);

router.post("/addAssets", isAuth, assetsController.addAssets);

module.exports = router;
