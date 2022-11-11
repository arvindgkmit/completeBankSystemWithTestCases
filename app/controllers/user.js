const db = require("../models/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
var validator = require("email-validator");
const User = db.users;
const Account = db.accounts;

// create user api
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  let hashPassword = bcrypt.hashSync(password, 10);

  if (!name || !email || !password) {
    return res.status(400).json({ message: "please provide all required fields" });
  }
  // check email is vaild or not
  if (!validator.validate(email)) {
    return res.status(400).json({ message: "please enter vaild email" });
  }

  try {
    let fetchEmail = await User.count({
      where: { email: email },
    });

    if (fetchEmail) {
      return res.status(409).json({ message: "user is already exist" });
    }

    let data = {
      name: name,
      email: email,
      password: hashPassword,
    };

    await User.create(data);
    return res.status(201).json({ message: "user created successfully" });
  } catch (error) { return error; }
};

// user login api
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (email == "" || password == "" || !email || !password) {
    return res.status(400).json({ message: "please provide all required fields and their value" });
  }

  try {
    // check email exist in database  or not
    let checkEmail = await User.count({
      where: { email: email },
    });

    let userData;
    if (checkEmail) {
      userData = await User.findOne({
        where: { email: email },
      });

    } else {
      return res.status(404).json({ message: "user not found" });
    }

    let verifyPassword = bcrypt.compareSync(password, userData.password);

    if (verifyPassword) {
      const data = JSON.stringify({ userId: userData.id });
      const token = jwt.sign(data, process.env.SECRET);
      res.cookie("token", token, { expire: new Date() + 100000 });

      return res.status(200).json({ message: "logged in successfully", token: token, });

    } else {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) { return error; }
};

// user logout api
exports.logout = (req, res) => {
  try {

    res.clearCookie("token");
    return res.status(200).json({ message: "Logout Successfully" });

  } catch (error) { return error; }
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    let data = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [{
          model: Account,
          attributes: { exclude: ["userId"] },
        }],
    });

    return res.status(200).json({ data: data });

  } catch (error) { return error;}
}

// get single user
exports.getSingleUsers = async (req, res) => {
  let userId = req.params.id;

  try {

    let data = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [{
        model: Account,
        attributes: { exclude: ["userId"] },
      }],
      where: { id: userId }
    });

    return res.status(200).json({ data: data });
  } catch (error) { return error; }
};
