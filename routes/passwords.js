const express = require("express");
const Password = require("../models/Password");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, async (req, res) => {
  const { platform, username, password } = req.body;
  const newPassword = new Password({ userId: req.user.userId, platform, username, password });
  await newPassword.save();
  res.json({ message: "Password saved" });
});

router.get("/", authMiddleware, async (req, res) => {
  const passwords = await Password.find({ userId: req.user.userId });
  res.json(passwords);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Password.findByIdAndDelete(req.params.id);
  res.json({ message: "Password deleted" });
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { username, password } = req.body;
  await Password.findByIdAndUpdate(req.params.id, { username, password });
  res.json({ message: "Password updated" });
});

module.exports = router;
