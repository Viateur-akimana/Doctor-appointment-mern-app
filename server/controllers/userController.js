const userModel = require("../model/userModel");
const doctorModel = require("../model/doctorModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

const deleteAllNoltificationController = async()=>{
try {
  const user = await userModel.findOne({_id:req.body._id});
  user.notification = [];
  user.seennotification = [];
  const upodatedUser = await user.save();
  res.status(201).send({
    success:true,
    message:"successfully deleting of the notification",
    data:updatedUser
  })
  
} catch (error) {
  console.log(error);
  res.status(500).send({
    success:false,
    message:"Failed,there is an error in deleting notifications"
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
};
