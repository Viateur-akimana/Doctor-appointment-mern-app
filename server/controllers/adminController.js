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

//change account status
const changeAccountStatusController = async () => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account-request-updated",
      message: `Your doctor account request is ${status}`,
      onClickPath: "/notification",
    });
    user.isDoctor=status === "Approved" ? true : false;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Account status is updated",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Account not changed",
    });
  }
};

module.exports = {
  getAlluserController,
  getAllDoctorControllers,
  changeAccountStatusController,
};
