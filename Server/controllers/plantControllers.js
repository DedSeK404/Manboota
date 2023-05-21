const plantModel = require("../models/plantModel");

module.exports.addPlant = async (req, res) => {
  try {
    const newPlant = new plantModel({ ...req.body });
    await newPlant.save();
    const { type } = req.body;
    if (type === "tree") {
      return res.send({ msg: "tree added successfuly" });
    }
    res.send({ msg: "plant added successfuly" });
  } catch (error) {
    res.status(400).send({ msg: error.message });
  }
};

module.exports.getallPlants = async (req, res) => {
  const { user } = req.params;
  try {
    const plants = await plantModel.find({ user: user });

    res.send({ plants });
  } catch (error) {
    res.send({ msg: error.message });
  }
};

module.exports.updatePlant = async (req, res) => {
  try {
    const { plantID } = req.body;
    const { timerEnd } = req.body;

    const plant = await plantModel.findByIdAndUpdate(
      plantID,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    if (req.body.timerRepeat && req.body.timerRepeat != "cancelled") {
      return res.send({
        plant: plant,
        msg: `Your repeating timer was set successfully`,
      });
    }
    if (req.body.timerRepeat === "cancelled") {
      return res.send({
        plant: plant,
        msg: `Your repeating timer was cancelled`,
      });
    }
    if (req.body.token) {
      return res.send({
        plant: plant,
        msg: `Changes were successful`,
      });
    }
    res.send({ plant: plant, msg: `timer is set to ${timerEnd}` });
  } catch (error) {
    res.send({ msg: error.message });
  }
};

module.exports.deletePlant = async (req, res) => {
  try {
    const { plantID } = req.params;

    const plant = await plantModel.findByIdAndRemove(plantID);
    res.send({ msg: "Plant deleted successfully" });
  } catch (error) {
    res.send({ msg: error.message });
  }
};
