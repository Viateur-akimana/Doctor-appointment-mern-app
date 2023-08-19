const express = require("express");
const router = express.Router();
const {registerController,loginController} = require("../controllers/userController")

//router for registering
router.post("/register", registerController);

//router for logining in
router.get("/login", loginController);

module.exports = router;
