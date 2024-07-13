const mongoose = require("mongoose")
const Schema = mongoose.Schema

const taskSchema = new Schema ({
    title : {
        type : String,
        required : true,
        trim : true,
    },

    startDate : {
        type : String,
        required : true,
        trim : true,
    },

    status : {
        type : String,
        required : true,
        trim : true,
    },

    task : {
        type : String,
        required : true,
        trim : true,
    }
})

const Task = mongoose.model("Task", taskSchema)
module.exports = Task