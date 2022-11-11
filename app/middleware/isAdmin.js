const db = require("../models/db");
const User = db.users;

exports.isAdmin = async (req, res, next) => {
  let id = req.userId;
  console.log("id", id);
  let checkData = await User.count({
    where: {
      id: id,
    },
  });

  let userData;

  if (checkData) {
    userData = await User.findOne({
      where: {
        id: id,
      },
    });
  } else {
    return res
      .status(404)
      .json({ error: "please enter vaild email or password" });
  }

  if (userData.email != "arvind@gmail.com") {
    return res.status(401).json({ message: "Manager access required" });
  }
  next();
};
