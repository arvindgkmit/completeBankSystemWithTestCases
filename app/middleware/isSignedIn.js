const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.isSignedIn = (req, res, next) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : req.cookies["token"];
  console.log(token);

  if (!token)
    return res.status(401).json({
      message: "please login",
    });

  jwt.verify(token, process.env.SECRET, (err, result) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    if (result) {
      console.log(result, "this result");
      req.userId = result.userId;
      // console.log(req.userId,"Raghav");
      return next();
    }
  });
};
