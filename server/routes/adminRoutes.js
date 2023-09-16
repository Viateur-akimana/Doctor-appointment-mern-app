const express = require("express");
const {
  getAlluserController,
  getAllDoctorControllers,
  changeAccountStatusController,
} = require("../controllers/adminController");
const router = express.Router();

//getting all users ||GET
router.get("/getAllUsers", getAlluserController);

//getting all doctors || GET
router.get("/getAllDoctors", getAllDoctorControllers);
//changing account status ||POST
router.post("/changeAccountStatus",changeAccountStatusController)
module.exports = router;
