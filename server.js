const express = require("express");
const app = require(".");

let port = process.env.PORT;
app.listen(port, () => {
  console.log("port is running on 3000");
});
