const express = require("express");
const PORT = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.send("hello there we are connected");
});

app.listen(PORT, console.log("connected"));
