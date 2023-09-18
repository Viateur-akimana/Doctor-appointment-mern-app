const express = require("express");
const router = express.Router();
const {
  getDoctorInfoController,
  updateProfileController,
  getDoctorByIdController,
  doctorAppointmentController,
  updateStatusController
} = require("../controllers/doctorController");

//route for getting doctor information
router.post("/getDoctorInfo", getDoctorInfoController);
//updating the profile
router.post("/updateProfile", updateProfileController);
//get doctor single doctor info
router.post("/getDoctorById", getDoctorByIdController);
//Doctor appountment
router.get("doctor-appointment", doctorAppointmentController);
//update status
router.post("update-status",updateStatusController)
module.exports = router;
