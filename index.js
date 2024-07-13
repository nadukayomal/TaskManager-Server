require("./db/mongoose")

const express = require('express')
const bodyParser = require('body-parser')
const corse = require('cors')
const userRouter = require('./routes/userRoutes')
const taskRouter = require('./routes/taskRouter')

const app = express()
const port = 5000

app.use(corse())
app.use(bodyParser.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log("Server is up and running"+ " " + port)
})