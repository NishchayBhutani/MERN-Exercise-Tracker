/** @format */

const router = require("express").Router();
const Exercise = require("../models/Exercise");

router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.post("/add", async (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  try {
    await newExercise.save();
    res.json("Exercise added!");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const user = await Exercise.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(400).json("invalid id");
    }
    res.json("Exercise deleted.");
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const user = await Exercise.findByIdAndUpdate(req.params.id, {
      username: req.body.username,
      description: req.body.description,
      duration: Number(req.body.duration),
      date: Date.parse(req.body.date),
    });
    res.json(user);
  } catch (err) {
    res.status(400).json("Error: " + err);
  }
});

module.exports = router;
