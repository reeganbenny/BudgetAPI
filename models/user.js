const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    requires: true,
  },
  assets: {
    items: [
      {
        assetItemId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Asset",
          required: true,
        },
      },
    ],
  },
});

module.exports = mongoose.model("User", userSchema);
