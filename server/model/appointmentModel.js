const momgoose = require("mongoose");

const appointmentSchema = new momgoose.Schema(
    {
    userId:{
        type:String,
        required:true
    },
    doctorId:{
        type:String,
        required:true
    },
    userInfo:{
        type:String,
        required:true
    },
    
        doctorInfo:{
            type:String,
            required:true
        },
        data:{
            type:String,
            required:true
        },
        status:{
            type:String,
            required:true
        },
        time:{
            type:String,
            required:true
        }
    },{ timestamps:true }
    
);
const appointmentModel = momgoose.model("appointment",appointmentSchema);
module.exports = appointmentModel;