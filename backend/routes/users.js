/** @format */

const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.post("/add", async (req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  try {
    await newUser.save();
    res.json("User added!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
