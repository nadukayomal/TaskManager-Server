const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
        trim : true,
    },
    lastName : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true,
        match : [/.+\@.+\..+/, 'Please enter a valid email address']
    },
    password : {
        type : String,
        required : true,
        trim : true,
    }
}) 

// create model
const User = mongoose.model("User", userSchema)
// export user model
module.exports = User