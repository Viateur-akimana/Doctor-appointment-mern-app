const express = require("express");
const { getAlluserController, getAllDoctorControllers } = require("../controllers/adminController");
const router = express.Router();

//getting all users ||GET
router.get("/getAllUsers", getAlluserController)

//getting all doctors || GET
router.get("/getAllDoctors", getAllDoctorControllers)


module.exports = router