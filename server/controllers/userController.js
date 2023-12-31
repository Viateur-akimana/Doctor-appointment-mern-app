const userModel = require("../model/userModel");
const doctorModel = require("../model/doctorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const appointmentModel = require("../model/appointmentModel");
const moment = require("moment");

//controllers
const registerController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ success: false, message: "already user exists" });
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res
      .status(200)
      .send({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, message: error.message });
  }
};
const loginController = async () => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not found" });
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res
        .status(200)
        .json({ success: "Invalid email or password", success: false });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expriresIn: 3 * 24 * 60 * 60 * 1000,
    });
    res.status(200).send({ success: true, message: "login successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error in loging in", success: false, token: token });
  }
};
//getting user data
const authController = async () => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(404).send({
        success: "false",
        message: "user not found",
      });
    } else {
      res.status(200).send({
        success: "true",
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: "false",
      message: "authentication failed",
    });
  }
};
//apply doctor controller

const applyDoctorController = async (req, res) => {
  try {
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "Apply-doctor-request",
      message: `${newDoctor.firstname} ${newDoctor.lastname} Has applied for account`,
      data: {
        doctorId: newDoctor._id,
        name: newDoctor.firstname + " " + newDoctor.lastname,
        onClickPath: "admin/doctors",
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: "An error occured when applying for doctor",
    });
  }
};

//getting all notification controller
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body._id });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(201).send({
      success: true,
      message: "Notification read",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "An error occured while getting notification",
      data: updatedUser,
    });
  }
};

const deleteAllNoltificationController = async () => {
  try {
    const user = await userModel.findOne({ _id: req.body._id });
    user.notification = [];
    user.seennotification = [];
    const upodatedUser = await user.save();
    res.status(201).send({
      success: true,
      message: "successfully deleting of the notification",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed,there is an error in deleting notifications",
    });
  }
};

const getAllDoctorsControllers = async () => {
  try {
    const doctors = await doctorModel.find({ status: "approved" });
    res.status(200).send({
      success: true,
      message: "All approved doctors",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Failed to get all doctors",
    });
  }
};

//book appointment controller
const bookAppointmentController = async () => {
  try {
    req.body.date = moment(req.body.date, "DD:MM:YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:MM").toISOString();
    req.body.status = "pending";
    const newAppointment = await appointmentModel(req.body);
    newAppointment.save();
    const user = await userModel.findById({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "Appointment-request",
      message: `Appointment request is made from ${req.body.userInfo.name}`,
      onClickPath: "/user/appointments",
    });
    await user.save();
    res.status(200).send({
      success: true,
      message: "Book appointment is successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in booking appointment",
    });
  }
};
//Booking availability controller
const bookAvailabilityController = async () => {
  try {
    const date = moment(req.body.date, "DD:MM:YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:MM")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:MM")
      .add(1, "hours")
      .toISOString();
    const doctorId = req.body._id;
    const appointments = await appointmentModel.find({
      doctorId,
      time: {
        $get: fromTime,
        $let: toTime,
      },
    });
    if (appointments.length > 0) {
      return res.status(500).send({
        success: true,
        message: "Appointment is not successfully",
      });
    } else {
      return res.status(200).send({
        success: true,
        message: "Appointment bookes well",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      error,
      message: "Error in book availability",
    });
  }
};
//user appointment controller
const userAppointmentController = async() =>{
  try {
    const appointments = await appointmentModel.find({userId:req.body.userId});
    res.status(200).send({
      success:true,
      message:"User appointment successfully done",
      data:appointments
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success:true,
      message:"Failed user appointment"
    })
  }
}
module.exports = {
  registerController,
  loginController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNoltificationController,
  getAllDoctorsControllers,
  bookAvailabilityController,
  bookAppointmentController,
  userAppointmentController
};
