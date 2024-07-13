const mongoose = require("mongoose")
const bcrypt = require("bcryptjs") 
const jwt = require("jsonwebtoken")
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
    },
    tokens : [
        {
            token : {
                type : String,
            }
        }
    ] 
}) 


userSchema.pre("save", async function (next){
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})


userSchema.statics.findByCredentials = async (email, password)=> {
    const user = await User.findOne({email})

    if(!user) {
        throw new Error()
    }

    const isMatch = bcrypt.compare(password, user.password)
    
    if (!isMatch) {
      throw new Error()  
    }

    return user;
}


// Generate an authentication token for the user upon successful login
userSchema.methods.generateAuthToken = async () => {
    const user = this;
    const token = jwt.sign({_id : user._id.toString()}, "mySecret")
    user.tokens = user.tokens.concat({token})

    await user.save()
    return token;
}


const User = mongoose.model("User", userSchema) // create model
module.exports = User // export user model
