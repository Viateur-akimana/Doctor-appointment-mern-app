const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "please provide a name"]
    },
    email:{
        type:String,
        required:[true,"please provide an email address"]
    },
    password:{
        type:String,
        required:[true,"please enter you password"]
    }
    
})

const userModel = mongoose.model("users",userSchema);

module.exports=userModel;