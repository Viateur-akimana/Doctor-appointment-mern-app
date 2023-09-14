const express = require("express");
const router = express.Router();
const useMidddleware = require("../middleware/userMiddleware");
const {registerController,loginController,authController, applyDoctorController} = require("../controllers/userController");

//router for registering   ||POST
router.post("/register", registerController);

//router for logining in  ||POST
router.post("/login", loginController);

// geting user data ||POST
router.post("/getUserData",authController)
//Appldoctor ||POST
router.post("/applydoctor",applyDoctorController)

module.exports = router;
