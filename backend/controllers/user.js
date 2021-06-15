const User = require("../models/user");
const Order = require("../models/order");

exports.getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      res.status(400).json({
        error: "No user was found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

exports.getUser = (req, res) => {
  req.profile.salt = undefined;
  req.profile.encry_password = undefined;
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.status(400).json({
          error: "UPDATE FAILED",
        });
      }
      user.salt = undefined;
      user.encry_password = undefined;
      res.json(user);
    }
  );
};

exports.userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No orders found",
        });
      }
      return res.status(200).json(order);
    });
};

exports.pushOredrPurchaseList = (req, res, next) => {
  const purchases = [];
  req.body.order.products.forEach((product) => {
    const { _id, name, description, category, quantity } = product;
    purchases.push({
      _id,
      name,
      description,
      category,
      quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id,
    });
  });

  // Store in DB
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchases) => {
      if (err) {
        res.status(400).json({
          error: "Unable to save purchase list",
        });
      }
      next();
    }
  );
};

// exports.getUser = async (req, res, next) => {
//   const user = await User.findById(req.params.userId);
//   if (!user) {
//     return res.status(400).json({
//       error: "No user found in DB",
//     });
//   }
//   res.json(user);
// };
