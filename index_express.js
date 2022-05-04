const express = require("express");
const app = express();

app.get("/red", (req, res, next) => {
  res.send("Hii red");
});

app.post("/red-again", (req, res, next) => {
  res.send("Hii red again");
});

app.use("/black", (req, res, next) => {
  res.send("Hello black");
});

app.use("/green", (req, res, next) => {
  res.send("Hii green");
});

app.listen(3000, () => {
  console.log("Listening at 3000");
});

// request

// req -> Middleware -> Middleware -> response
