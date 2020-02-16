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

server.post("/users", (req, res) => {
  if (req.body.name) {
    userArray.push(req.body);
    res.status(201).json({ message: "User was added", user: req.body });
  } else {
    res.status(401).json({ message: "No data was detected" });
  }
});

server.delete("/users", (req, res) => {
  if (req.body.name) {
    userArray = userArray.filter(del => del.name !== req.body.name);
    res.status(201).json({ message: "User was deleted", user: req.body });
  } else {
    res.status(401).json({ message: "No data was detected" });
  }
});

module.exports = server;
