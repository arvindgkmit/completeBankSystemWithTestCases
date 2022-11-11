const express = require("express");
const router = express.Router();
const {createUser, login, logout, getAllUsers, getSingleUsers} = require("../controllers/user");
const {isSignedIn} = require("../middleware/isSignedIn");
const {isAdmin} = require("../middleware/isAdmin");

router.post("/users",isSignedIn,isAdmin, createUser);
router.get("/users",isSignedIn,isAdmin, getAllUsers);
router.get("/users/:id",isSignedIn,isAdmin, getSingleUsers);
router.post("/login", login);
router.post("/logout", isSignedIn, logout);

module.exports = router;
