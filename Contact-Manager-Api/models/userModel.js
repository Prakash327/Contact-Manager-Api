const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:[true,"Please enter a name"]
    },
    email:{
        type:String,
        require:[true,"please enter a email"],
        unique:[true,"this email is already taken"]
    },
    password:{
        type:String,
        reuired:[true,"Please enter a password"]
    },
},{
    timestamps:true,
});

module.exports = mongoose.model("User",userSchema)