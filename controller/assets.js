const mongoose = require("mongoose");
const User = require("../models/user");
const Asset = require("../models/assets");

exports.getAssets = (req, res, next) => {
  User.findById(req._userId)
    .populate("assets.items.assetItemId")
    .then((user) => {
      console.log(user);
      res.status(200).json(user.assets);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.addAssets = (req, res, next) => {
  const assetname = req.body.assetname;
  const description = req.body.description;
  const totalCost = req.body.totalCost;

  const newAsset = new Asset({
    assetname: assetname,
    description: description,
    totalCost: totalCost,
    userId: req.body._userId,
  });
  newAsset.save();
  console.log(newAsset._id);
  console.log(req._userId);
  User.findById(req._userId)
    .then((user) => {
      user.assets.items.push({ assetItemId: newAsset._id });
      user.save();
    })
    .then((result) => {
      res.status(201).json({ meg: "Asset  Added!", AssetId: newAsset._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
