const express = require('express')
const router = express.Router()
const Task = require("../models/taskModel")

// create task 
router.post("/task", async(req,res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error){
        res.status(400).send(error)
    }
})

// get task
router.get("/task", async(req, res) => {
    try {
        const tasks = await Task.find({})
        res.status(201).send(tasks)
    } catch (error) {
        res.status(400).send(error)
    }
})


module.exports = router