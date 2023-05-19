const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  name: { type: String },
  species: { type: String },
  water: { type: String },
  type: { type: String },
  creationDate: { type: Date, default: new Date() },
  timerStart: { type: String },
  timerEnd: { type: String },
  editDate: { type: Date },
  timerRepeat: { type: String },
  user: { type: mongoose.Types.ObjectId, ref: "users" },
});

const plantModel = mongoose.model("plants", plantSchema);

module.exports = plantModel;
