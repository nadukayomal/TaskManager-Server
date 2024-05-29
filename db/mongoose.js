const mongoose = require('mongoose')
const url = "mongodb+srv://Naduka:na1234@usertaskinfocluster.hijrhn7.mongodb.net/taskManagerDB?retryWrites=true&w=majority&appName=UserTaskInfoCluster"
const connection = mongoose.connection

mongoose.connect(url, {
    useNewUrlParser:true, 
    useUnifiedTopology:true
});

mongoose.set('strictQuery',true)

connection.once("open",()=>{
    console.log("MongoDB connected")
})