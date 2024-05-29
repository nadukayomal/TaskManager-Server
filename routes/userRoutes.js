const express = require('express')
const router = express.Router()
const User = require("../models/userModel")
const { model } = require('mongoose')

router.post("/users", async(req, res)=>{
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get("/users", async(req, res)=>{
    try{
        const user = await User.find({})
        res.status(201).send(user)
    } catch {
        res.status(400).send(error)
    }
})

module.exports = router;