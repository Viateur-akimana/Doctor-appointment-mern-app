const express = require("express");
const router = express.Router();
const useMidddleware = require("../middleware/userMiddleware");
const {registerController,loginController,authController, applyDoctorController,getAllNotificationController,deleteAllNoltificationController} = require("../controllers/userController");

//router for registering   ||POST
router.post("/register", registerController);

//router for logining in  ||POST
router.post("/login", loginController);

// geting user data ||POST
router.post("/getUserData",authController)
//Appldoctor ||POST
router.post("/applydoctor",applyDoctorController);
//get all notification ||POST
router.post("/get-all-notification",getAllNotificationController);
//deleting all notifications
router.post("/delete-all-notification",deleteAllNoltificationController)

module.exports = router;
