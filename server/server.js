const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const connectedDb = require("./config/db.js");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorRoutes")

//configuring environment variables
dotenv.config();

//mongodb connection
connectedDb();
//resting object
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("api/v1/user", userRoutes);
app.use("api/v1/admin", adminRoutes);
app.use("api/v1/doctor",doctorRoutes);

//listening for the port
const port = process.env.PORT || 3001;

//running the server
app.listen(port, () => {
  console.log(
    `the app is running on port ${process.env.PORT} and mode ${process.env.NODE_MODE}`
  );
});
