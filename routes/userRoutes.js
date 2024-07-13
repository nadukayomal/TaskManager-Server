const express = require('express')
const router = express.Router()
const User = require("../models/userModel")
const auth = require("../middleware/auth")
// const { model } = require('mongoose')

// THIS IS THE GOOGLE AUTH PART

// const dotenv = require('dotenv')
// dotenv.config()
// const {OAuth2Client} = require('google-auth-library')
// END THE GOOGLE AUTH PART


/** 
  * 1st route handles POST requests to login user and uses an authentication middleware to ensure.
  * 2nd route handles POST requests to create user.
  * 3rd route handles GET requests to fetch all users and uses an authentication middleware to ensure.
  * 4th route handles DELETE requests to /users/:id and uses an authentication middleware to ensure.
*/

router.post("/users/login", async (req, res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (error) {
        res.status(401)
    }
});


router.post("/users", async(req, res)=>{ 
    const user = new User(req.body)
    // console.log(user)
    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
});


router.get("/users", auth, async(req, res)=>{  
    try{
        const user = await User.find({})
        res.status(201).send(user)
    } catch {
        res.status(400).send(error)
    }
});


router.delete("/users/:id", auth, async(req, res)=>{
    const _id = req.params.id;
    try {
        const deleteUser = await User.findOneAndDelete({id : _id})
        if(!deleteUser) {
            return res.status(404).send();
        }
        res.status(201).send(deleteUser)
    } catch (error) {
        res.status(400).send(error)
    }
});


module.exports = router;