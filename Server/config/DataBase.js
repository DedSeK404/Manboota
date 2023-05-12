const mongoose = require("mongoose");

const DataBase = async () => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect(process.env.Mongo_URL, connectionParams);
    console.log("DataBase is connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = DataBase;
