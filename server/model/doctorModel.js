const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  firstname: {
    type: String,
    required: [true, "please firstname is required"],
  },
  lastName: {
    type: String,
    required: [true, "Please enter lastname"],
  },
  phone: {
    type: String,
    required: [true, "Please enter a phone number"],
  },
  website: {
    type: String,
  },
  address: {
    type: String,
    required: [true, "Please provide an email"],
  },
  experience: {
    type: String,
    required: [true, "Please enter an experience"],
  },
  feesperconsultation: {
    type: String,
    required: [true, "Please provide fees"],
  },
  status: {
    type:String,
    default:"pending"
  },
  timings: {
    type: Object,
    required: [true, "Please give the time"],
  },
  seennotification:{
    type:String
  }
},{timestamps: true}
);

const doctorModel = mongoose.model('doctors',doctorSchema);

module.exports=doctorModel
