const express = require("express");
const router = express.Router();
const {account, closeAccount} = require("../controllers/account");
const {isAdmin} = require("../middleware/isAdmin");
const {isSignedIn} = require("../middleware/isSignedIn");

router.post("/accounts", isSignedIn, isAdmin, account);
router.patch("/accounts", isSignedIn, isAdmin, closeAccount);

module.exports = router;
