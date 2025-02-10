const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  role: { type: String, default: "user" },
  phone: { type: String, required: true },
  image: { type: String },
});

module.exports = mongoose.model("User", userSchema);
