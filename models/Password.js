const mongoose = require("mongoose");

const PasswordSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  platform: String,
  username: String,
  password: String
});

module.exports = mongoose.model("Password", PasswordSchema);
