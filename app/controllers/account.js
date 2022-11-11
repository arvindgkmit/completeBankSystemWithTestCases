const db = require("../models/db");
const Account = db.accounts;
const User = db.users;

// create user account api
exports.account = async (req, res) => {

  const { type, userId } = req.body;

  if (!type || !userId) {
    return res.status(400).json({ message: "please provide all required fields" });
  }

  if (type != "current" && type != "saving") {
    return res.status(400).json({ message: "please enter valid type" });
  }
  
  try {
    let data = {
      type: type,
      amount: 0,
      userId: userId,
    };

    let checkUser = await User.count({
      where: { id: data.userId },
    });

    if (!checkUser) {
      return res.status(404).json({ message: "user not found" });
    }

    let status = "active";
    await Account.create(data);
    await User.update(
      { status: "active" },
      { where: { id: userId } }
    );

    return res.status(201).json({ message: "accounted created successfully" });
  } catch (error) { return error; }
};

// close user account
exports.closeAccount = async (req, res) => {
  let accountNo = req.body.accountNo;

  if (!accountNo) {
    return res.status(400).json({ message: "please enter acountNo" });
  }

  try {

    let checkAccountStatus = await Account.count({
      where: { accountNo: accountNo },
    });

    if (!checkAccountStatus) {
      return res.status(404).json({ message: "account not found" });
    }

    let getStatus = await Account.findOne({
      where: { accountNo: accountNo },
      attributes: { exclude: ["accountNo", "type", "amount", "userId"] },
    });

    let currentStatus = getStatus;
    if (currentStatus.dataValues.status == "inactive") {
      return res.status(400).json({ message: "account is already closed" });
    }

    await Account.update(
      { status: "Inactive" },
      { where: { accountNo: accountNo } }
    );
    return res.status(200).json({
      message: "account closed successfully",
    });
  } catch (error) { return error; }
};
