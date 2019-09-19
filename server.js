const express = require("express");

const server = express();
server.use(express.json());

let userArray = [{ name: "Adnan" }, { name: "Zach" }, { name: "Landry" }];

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

server.get("/users", (req, res) => {
  res.status(200).json(userArray);
});

module.exports = server;
