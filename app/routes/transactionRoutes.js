const express = require("express");
const router = express.Router();
const {deposit, withdraw, transaction} = require("../controllers/transaction");
const {isSignedIn} = require("../middleware/isSignedIn");

router.post("/deposit", isSignedIn, deposit);
router.post("/withdraw", isSignedIn, withdraw);
router.get("/transactions", isSignedIn, transaction);

module.exports = router;