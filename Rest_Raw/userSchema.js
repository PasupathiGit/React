const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
        lowercase: true
    },
    email : {
        type: String,
        required: true,
    },
    password : {
        type: String,
        required: true,
    },
    createdDate: {
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model("User", userSchema);