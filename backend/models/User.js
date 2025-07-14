const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
    },
     lastName:{
        type:String,
    },
     email:{
        type:String,
        required: true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    resetToken:String,
    resetTokenExpire:Date,

});

module.exports = mongoose.model("User", UserSchema);