const express = require("express");
const router = express.Router();
const useMidddleware = require("../middleware/userMiddleware");
const {registerController,loginController,authController} = require("../controllers/userController")

//router for registering
router.post("/register", registerController);

//router for logining in
router.post("/login", loginController);

// geting user data
router.post("/getUserData",authController)

module.exports = router;
