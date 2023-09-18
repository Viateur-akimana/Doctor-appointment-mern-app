const appointmentModel = require("../model/appointmentModel");
const doctorModel = require("../model/doctorModel");

const getDoctorInfoController = async () => {
  try {
    const doctor = await doctorModel
      .findOne({ userId: req.body.userId })
      .res.status(200)
      .send({
        success: true,
        message: "These are doctor detai",
        data: doctor,
      });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in fetching doctor info",
    });
  }
};
const updateProfileController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req,
      body
    );
    res.status(200).send({
      success: true,
      message: "updating the profile",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      error,
      message: "An error in updating profile",
    });
  }
};
//getting single doctor
const getDoctorByIdController = async () => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId });
    res.status(200).send({
      success: true,
      message: "Fetching single doctor information",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Failed to get single doctor information",
    });
  }
};

//Doctor appointment
const doctorAppointmentController = async () => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    const appointments = await appointmentModel.find({
      doctorId: doctor._id,
    });
    res.status(200).send({
      success: true,
      message: "Doctor appointment fetched successfully",
      data: appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Failed doctor appointment",
    });
  }
};
//updating doctor status
const updateStatusController = async () => {
  try {
    const { appointmentsId, status } = req.body;
    const appointments = await appointmentModel.findByIdAndUpdate(
      appointmentsId,
      { status }
    );
    const user = await userModel.findOne({ _id:appointments.userId });
    const notification = user.notification;
    user.notification.push({
      type: "Appointment-request",
      message: `Appointment has updated ${status}`,
      onClickPath: "/doctor-appointments",
    });
    await user.save();
    res.status(200).send({
      success:true,
      message:"Appointment status updated"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in updating your status",
    });
  }
};
module.exports = {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentController,
  updateStatusController,
};
