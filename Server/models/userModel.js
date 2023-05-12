const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  creationDate: { type: Date, default: new Date() },
});

const UserModel = mongoose.model("farmers", userSchema);

module.exports = UserModel;
