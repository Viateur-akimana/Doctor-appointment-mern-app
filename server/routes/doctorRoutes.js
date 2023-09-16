const express = require("express");
const router = express.Router();
const {getDoctorInfoController, updateProfileController} = require('../controllers/doctorController') 


//route for getting doctor information
router.post("/getDoctorInfo",getDoctorInfoController);
router.post("/updateProfile",updateProfileController)
module.exports = router