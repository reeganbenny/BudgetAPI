const mongoose = require("mongoose");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

exports.createUser = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(422).json({
          message: "Mail Exists",
        });
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          email: req.body.email,
          password: req.body.password,
        });
        console.log(user);
        user
          .save()
          .then((result) => {
            res.status(201).json({
              message: "User created",
            });
          })
          .catch((err) => {
            res.status(500).json({
              error: err,
            });
          });
      }
    });
};

exports.login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      let flag = req.body.password.localeCompare(user[0].password);
      if (flag === 0) {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );

        return res.status(200).json({
          message: "Auth Successfull",
          token: token,
        });
      }
      res.status(401).json({
        message: "Auth failed",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.deleteUser = (req, res, next) => {
  console.log(req.params.userId);
  User.findByIdAndRemove(req.params.userId)
    .then((result) => {
      console.log(result);
      res.status(200).json({ message: "User deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
