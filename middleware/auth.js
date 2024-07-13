const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
    try {
        // extract token from header
        const token = req.header("Authorization").replace("Bearer ","") 

        // verify token using secret key
        const decoded = jwt.verify(token,"mySecret") 
        
        // Find the user associated with the decoded token ID and token
        const user = await User.findOne({
            _id : decoded._id,
            "tokens.token" : token 
        })
        
        if (!user) {
            throw new Error()
        }

        req.user = user;

        next();

    } catch (error) {
        res.status(401).send({error:"Please Auth"})
    }
};

module.exports = auth;