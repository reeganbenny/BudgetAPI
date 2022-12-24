const mongoose = require("mongoose");

const assetSchema = mongoose.Schema({
  assetname: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  totalCost: {
    type: Number,
    required: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
});

module.exports = mongoose.model("Asset", assetSchema);
