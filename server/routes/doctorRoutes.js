const express = require("express");
const router = express.Router();
const {getDoctorInfoController, updateProfileController, getDoctorByIdController} = require('../controllers/doctorController') 


//route for getting doctor information
router.post("/getDoctorInfo",getDoctorInfoController);
//updating the profile
router.post("/updateProfile",updateProfileController);
//get doctor single doctor info
router.post("/getDoctorById",getDoctorByIdController);
module.exports = router