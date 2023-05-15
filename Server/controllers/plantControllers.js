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

module.exports.updateOffer = async (req, res) => {
  try {
    const { idoffer } = req.body;
    const { status } = req.body;

    const offerState = await offerModel.findOne({ _id: idoffer });

    if (offerState == null) {
      return res.send({ msg: "The Sitter deleted the offer" });
    }

    const offerStatus = await offerModel.findByIdAndUpdate(
      idoffer,
      {
        $set: {
          ...req.body,
        },
      },
      { new: true }
    );
    res.send({
      offerStatus: offerStatus,
      msg:
        status == "active"
          ? "Offer accepted"
          : status == "declined"
          ? "Offer declined"
          : "",
    });
  } catch (error) {
    res.send({ msg: error.message });
  }
};

module.exports.deleteOffer = async (req, res) => {
  try {
    const { offerid } = req.params;

    const offerStatus = await offerModel.findOne({ _id: offerid });

    if (offerStatus.status == "declined" || offerStatus.status == "active") {
      return res.send({
        msg: "The Sitter already accepted or declined the offer",
      });
    }

    const deleteOffer = await offerModel.findByIdAndRemove(offerid);
    res.send({ msg: "offer deleted successfully" });
  } catch (error) {
    res.send({ msg: error.message });
  }
};
