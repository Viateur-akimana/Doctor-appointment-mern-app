const mongoose = require("mongoose");

const connectedDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connnected to database successfully");
  } catch (error) {
    console.log("connection to db error");
  }
};

module.exports = connectedDb;
