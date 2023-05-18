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

// module.exports.deleteOffer = async (req, res) => {
//   try {
//     const { offerid } = req.params;

//     const offerStatus = await offerModel.findOne({ _id: offerid });

//     if (offerStatus.status == "declined" || offerStatus.status == "active") {
//       return res.send({
//         msg: "The Sitter already accepted or declined the offer",
//       });
//     }

//     const deleteOffer = await offerModel.findByIdAndRemove(offerid);
//     res.send({ msg: "offer deleted successfully" });
//   } catch (error) {
//     res.send({ msg: error.message });
//   }
// };

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
    res.send({ plant: plant, msg: `timer is set to ${timerEnd}` });
  } catch (error) {
    res.send({ msg: error.message });
  }
};
