const userModel = require("../model/userModel");
const doctorModel = require("../model/doctorModel");

const getAlluserController = async () => {
  try {
    const user = await userModel.find({});

    res.status(200).send({
      success: true,
      message: "user data",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Filed to get all users",
    });
  }
};

const getAllDoctorControllers = async () => {
  try {
    const doctor = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctor data",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "failed to get all doctors",
    });
  }
};

module.exports = {
  getAlluserController,
  getAllDoctorControllers,
};
